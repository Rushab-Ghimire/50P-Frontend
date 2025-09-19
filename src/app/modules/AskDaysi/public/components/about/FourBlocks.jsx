import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { descriptionId } from "@rjsf/utils";
import rocket from "/assets/images/askdaysi/about-us/rocket.png";
import idea from "/assets/images/askdaysi/about-us/idea.png";
import glass from "/assets/images/askdaysi/about-us/glass.png";
import horn from "/assets/images/askdaysi/about-us/horn.png";
import calendar from "/assets/images/askdaysi/about-us/calendar.png";
import chart from "/assets/images/askdaysi/about-us/chart.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const imgStyle = {
  width: "16px",
  marginRight: "5px",
};

const AboutFourBlocks = () => {
  const { t } = useTranslation();
  const blockData = [
    // {
    //   id: 1,
    //   title: "Our Mission",
    //   description:
    //     "To revolutionize healthcare access by connecting patients with culturally competent healthcare providers, ensuring everyone receives personalized and understanding care.",
    // },
    // {
    //   id: 2,
    //   title: "Our Vision",
    //   description:
    //     "A world where healthcare is accessible, personalized, and culturally sensitive, empowering both patients and providers to achieve better health outcomes.",
    // },
    // {
    //   id: 3,
    //   title: "Innovation",
    //   description:
    //     "Leveraging cutting-edge technology like DAYSI, our AI assistant, to provide seamless healthcare experiences and bridge communication gaps.",
    // },
    // {
    //   id: 4,
    //   title: "Community",
    //   description:
    //     "Building a diverse and inclusive healthcare community that celebrates and respects cultural differences while providing exceptional medical care.",
    // },
    {
      id: 5,
      title: t("about.p1t"),
      description: t("about.p1d"),
    },
    {
      id: 6,
      title: t("about.p2t"),
      description: t("about.p2d"),
    },
    {
      id: 7,
      title: t("about.p3t"),
      description:
        `<span style="font-weight: 500;">` +
        t("about.p3d1b") +
        `</span>` +
        t("about.p3d1nb") +
        `<br/> 
      <span style="font-weight: 500;">` +
        t("about.p3d2b") +
        `</span>` +
        t("about.p3d2nb") +
        `<br/> 
      <span style="font-weight: 500;">` +
        t("about.p3d3b") +
        `</span>` +
        t("about.p3d3nb") +
        `<br/><span style="font-weight: 500;">` +
        t("about.p3d4b") +
        `</span>` +
        t("about.p3d4nb") +
        ``,
    },
    //   {
    //     id: 8,
    //     title: "Join the Movement",
    //     description:
    //       `We're launching soon! Sign up for early access and be the first to experience AskDaysi.<br/>` +
    //       `
    //     Are you a provider? Join our growing network of doctors who care about cultural competence.<br/>` +
    //       `
    // Interested in investing? We're closing the last allocation of our SAFE round. Let's connect.<br/>` +
    //       `
    // Book a call with our team: Calendly
    //     `,
    //   },
  ];
  return (
    <>
      <Grid container spacing={3}>
        {blockData.map((data, index) => (
          <Grid item xs={12} md={12}>
            <Box>
              <Typography variant="h3" fontWeight={"500"}>
                {data.title}
              </Typography>
              <Typography
                variant="p"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
                sx={{ fontSize: "16px" }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={12}>
          <Box>
            <Typography variant="h3" fontWeight={"500"}>
              {t("about.p4t")}
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "16px", lineHeight: "28px" }}
            >
              <img src={rocket} alt="Rocket" style={imgStyle} />
              {t("about.p4d1")} <br />
              <img src={glass} alt="Rocket" style={imgStyle} />
              {t("about.p4d2")} <br />
              <img src={idea} alt="Rocket" style={imgStyle} />
              {t("about.p4d3")} <br />
              {/* <img src={calendar} alt="Rocket" style={imgStyle} />
              {t("about.p4d4")}{" "}
              <Link
                to="https://calendly.com/hello-askdaysi/30min"
                target="_blank"
              >
                Calendly
              </Link>
              <br />
              <img src={horn} alt="Rocket" style={imgStyle} />
              {t("about.p4d5")}{" "}
              <Link to="https://askdaysi.com/" target="_blank">
                www.askdaysi.com
              </Link>
              <br />
              <img src={chart} alt="Rocket" style={imgStyle} />
              {t("about.p4d9")}
              <br />
              <ul style={{ margin: 0 }}>
                <li>
                  <Link
                    to="https://forms.gle/bAadVLLjZZXZFyQ47"
                    target="_blank"
                  >
                    {t("about.p4d6")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://forms.gle/bLrLUYLfcRocwB3eA"
                    target="_blank"
                  >
                    {t("about.p4d7")}
                  </Link>
                </li>
              </ul> */}
              {t("about.p4d8")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutFourBlocks;
