import { LiveInfoRelations } from "@/app/_types/LiveInfoRelations";

type ReservationListProps = {
  liveInfos: LiveInfoRelations[];
  isLoading: boolean;
};

export const ReservationList = ({
  liveInfos,
  isLoading,
}: ReservationListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500 text-lg">読み込み中...</p>
      </div>
    );
  }

  if (liveInfos.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500 text-lg">ライブ情報がありません。</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-[10%_20%_20%_50%] bg-[#01B285] text-white">
          <th className="text-left p-2 border-b text-center">No.</th>
          <th className="text-left p-2 border-b text-center">日付</th>
          <th className="text-left p-2 border-b text-center">開場時間</th>
          <th className="text-left p-2 border-b text-center">ライブ名</th>
        </tr>
      </thead>
      <tbody>
        {liveInfos.map((liveInfo) => (
          <tr key={liveInfo.id} className="grid grid-cols-[10%_20%_20%_50%]">
            <td className="text-left p-2 border-b text-center">{liveInfo.id}</td>
            <td className="text-left p-2 border-b text-center">{liveInfo.day}</td>
            <td className="text-left p-2 border-b text-center">{liveInfo.openTime}</td>
            <td className="text-left p-2 border-b text-center">{liveInfo.liveName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
