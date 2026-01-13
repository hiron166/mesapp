import { NextRequest, NextResponse } from "next/server";
import {
  FellowPerformer,
  Performer,
  PrismaClient,
  Reservation,
} from "@prisma/client";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient();

type LiveInfoBody = {
  liveInfo: {
    day: number;
    openTime: number;
    liveName: string;
    chargePrice: number;
    ticketQuota: number;
  };
  // リレーション定義
  reservations: Reservation[];
  fellowPerformers: FellowPerformer[];
  performers: Performer[];
};

// POSTという命名にすることで、POSTリクエストの時にこの関数が呼ばれる
export const POST = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    // リクエストのbodyをJSONとして取得
    const body = await req.json();

    //bodyの中から必要なデータを取り出す
    const {
      liveInfo,
      reservations,
      fellowPerformers,
      performers,
    }: LiveInfoBody = body;

    //DBにデータを生成する
    const data = await prisma.liveInfo.create({
      data: {
        day: liveInfo.day,
        openTime: liveInfo.openTime,
        liveName: liveInfo.liveName,
        chargePrice: liveInfo.chargePrice,
        ticketQuota: liveInfo.ticketQuota,
        reservations: {
          // createを使うことで、このliveInfoに紐づくreservationsレコードを同時に作成
          create: reservations,
        },
        fellowPerformers: {
          create: fellowPerformers,
        },
        performers: {
          create: performers,
        },
      },
    });

    // レスポンスを返す
    return NextResponse.json({
      status: "OK",
      message: "ライブ情報を追加しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
