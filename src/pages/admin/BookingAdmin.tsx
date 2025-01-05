import { ITourDetail } from "@/common/types/tour";
import ModalHandleTourAdmin from "@/components/ModalHandleTourAdmin";
import useCallApi from "@/hooks/useCallApi";
import { getAllTourService } from "@/services/tour";
import { Button, Table, TableColumnsType, Typography } from "antd";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/transfer/search";
import { useEffect, useState } from "react";

const BookingAdmin = () => {
  const { data, callApi } = useCallApi({ func: getAllTourService });
  const [valueModal, setValueModal] = useState<{
    open?: boolean;
    tour?: ITourDetail;
  }>({});
  const [searchTerm, setSearchTerm] = useState<string>(""); // Giá trị tìm kiếm
  const [filteredData, setFilteredData] = useState<ITourDetail[]>([]); // Dữ liệu đã lọc

  const columns: TableColumnsType<ITourDetail> = [
    {
      title: "Tên tour",
      dataIndex: "title",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
    },
    {
      title: "Lịch trình",
      dataIndex: "schedule",
    },
    {
      title: "Giá trẻ em",
      dataIndex: "price_children",
    },
    {
      title: "Giá người lớn",
      dataIndex: "price_aldults",
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            onClick={() => setValueModal({ open: true, tour: record })}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  // Hàm lọc dữ liệu
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = data?.content.filter((item: ITourDetail) => {
      const lowerSearchTerm = value.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.schedule.toLowerCase().includes(lowerSearchTerm) ||
        item.destination.toLowerCase().includes(lowerSearchTerm) ||
        item.departure.toLowerCase().includes(lowerSearchTerm)
      );
    });
    setFilteredData(filtered || []);
  };

  useEffect(() => {
    callApi();
  }, []);

  // Cập nhật filteredData khi `data` thay đổi
  useEffect(() => {
    setFilteredData(data?.content || []);
  }, [data]);

  return (
    <>
      <ModalHandleTourAdmin
        valueModal={valueModal}
        setValueModal={setValueModal}
        callbackSuccess={callApi}
      />
      <div className="flex justify-between items-center mb-10">
        <Typography.Title level={3}>Quản lý đặt tour</Typography.Title>
        <div className="flex gap-8">
          <div className="w-[400px]">
            <Search
              placeholder="Tìm kiếm tour"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)} // Lọc dữ liệu khi nhập
            />
          </div>
          <Button type="primary" onClick={() => setValueModal({ open: true })}>
            Tạo Tour
          </Button>
        </div>
      </div>

      <Table<ITourDetail>
        columns={columns}
        pagination={false}
        dataSource={filteredData as ITourDetail[]} // Hiển thị dữ liệu đã lọc
      />
    </>
  );
};

export default BookingAdmin;
