import React from "react";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { JumboCard } from "@jumbo/components";
import { Box, Button, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const userList = [
  {
    id: 1,
    name: "Jenny Doe",
    email: "jenny@jenny.com",
    avatar: "/assets/images/avatar/avatar3.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@john.com",
    avatar: "/assets/images/avatar/avatar4.jpg",
  },
  {
    id: 3,
    name: "Nicole",
    email: "nicole@nicole.com",
    avatar: "/assets/images/avatar/avatar5.jpg",
  },
  {
    id: 4,
    name: "Juliet",
    email: "juliet@juliet.com",
    avatar: "/assets/images/avatar/avatar6.jpg",
  },
  {
    id: 5,
    name: "Smith Doe",
    email: "smith@smith.com",
    avatar: "/assets/images/avatar/avatar7.jpg",
  },
  {
    id: 6,
    name: "Scarlette",
    email: "scarlette@scarlette.com",
    avatar: "/assets/images/avatar/avatar8.jpg",
  },
  {
    id: 7,
    name: "Sarah Williams",
    email: "sarah@sarah.com",
    avatar: "/assets/images/avatar/avatar9.jpg",
  },
  {
    id: 8,
    name: "Lenny",
    email: "lenny@lenny.com",
    avatar: "/assets/images/avatar/avatar10.jpg",
  },
];

const UserCard = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Autoplay, Pagination]}
        className="userSlider"
      >
        {userList.map((data, index) => (
          <SwiperSlide>
            <Box
              sx={{
                boxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)",
                xmaxWidth: "300px",
                textAlign: "center",
                borderRadius: 3,
              }}
              key={index}
            >
              <Box sx={{ padding: "40px 20px 20px 20px" }}>
                <img
                  src={data.avatar}
                  alt={data.name}
                  style={{
                    borderRadius: "50%",
                    height: "150px",
                    width: "150px",
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: "500", mt: 2 }}>
                  {data.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: Colors.white_2,
                  padding: "20px",
                }}
              >
                <Typography variant="h4">
                  <EmailOutlinedIcon
                    sx={{ position: "relative", top: "7px" }}
                  />{" "}
                  {data.email}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Book An Appointment
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default UserCard;
