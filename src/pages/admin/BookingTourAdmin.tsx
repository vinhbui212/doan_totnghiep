import { useEffect, useState } from "react";
import { Button, Table, TableColumnsType, Typography } from "antd";
import Search from "antd/es/transfer/search";
import useCallApi from "@/hooks/useCallApi";
import { getAllBookingService } from "@/services/tour";

interface TBookingDetail {
  id: number;
  customerId: number;
  customerName: string | null;
  bookingDate: string;
  numOfPeople: number;
  numOfChildren: number;
  status: string;
  tourId: number;
  tourName: string;
  travelDate: string;
}

const BookingTourAdmin = () => {
  const { data, callApi } = useCallApi({ func: getAllBookingService });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<TBookingDetail[]>([]);

  const columns: TableColumnsType<TBookingDetail> = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      render: (value) => value || "Không xác định", // Hiển thị nếu customerName null
    },
    {
      title: "Tên tour",
      dataIndex: "tourName",
    },
    {
      title: "Ngày đặt",
      dataIndex: "bookingDate",
      render: (value) => new Date(value).toLocaleDateString(), // Format ngày
    },
    {
      title: "Ngày đi",
      dataIndex: "travelDate",
      render: (value) => new Date(value).toLocaleDateString(), // Format ngày
    },
    {
      title: "Số người lớn",
      dataIndex: "numOfPeople",
    },
    {
      title: "Số trẻ em",
      dataIndex: "numOfChildren",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value) => (
        <span
          style={{
            color: value === "CANCELED" ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  // Hàm lọc dữ liệu
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const lowerSearchTerm = value.toLowerCase();
    const filtered = data?.content.filter((item: TBookingDetail) => {
      return (
        (item.customerName?.toLowerCase().includes(lowerSearchTerm) ||
          item.tourName.toLowerCase().includes(lowerSearchTerm)) &&
        item
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
      <div className="flex justify-between items-center mb-10">
        <Typography.Title level={3}>Quản lý đặt chỗ</Typography.Title>

        <div className="flex gap-8">
          <div className="w-[400px]">
            <Search
              placeholder="Tìm kiếm theo khách hàng hoặc tên tour"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)} // Lọc dữ liệu khi nhập
            />
          </div>
        </div>
      </div>

      <Table<TBookingDetail>
        columns={columns}
        pagination={false}
        dataSource={filteredData as TBookingDetail[]} // Hiển thị dữ liệu đã lọc
      />
    </>
  );
};

export default BookingTourAdmin;
