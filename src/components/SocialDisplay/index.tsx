import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { useMemo, useState } from "react";
import dateFormat from "dateformat";
import styles from "./index.module.css";

export type TSocialForm = {
  title: string;
  time?: string;
  date?: string;
  startAt: string;
  venue: string;
  capacity: number;
  price?: number;
  description: string;
  isManualApprove?: boolean;
  privacy: string;
  banner: string;
  tags: string[];
};

export default function SocialDisplay({ data }: { data: TSocialForm }) {
  const [formValue, setFormValue] = useState<TSocialForm>(data);

  const startAt = useMemo(() => {
    const tempDate = new Date(data.startAt);
    const date = dateFormat(tempDate, "mmmm d, ddd");
    const time = dateFormat(tempDate, "h TT");
    return { date, time };
  }, [data]);

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Box sx={{ width: "50%" }}>
          <Box sx={{ position: "relative", pl: 1.25, mb: 2 }}>
            <Box
              sx={{
                width: "120%",
                fontSize: 48,
                fontFamily: "monospace",
                wordWrap: "break-word",
                fontWeight: 700,
                pt: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  background: "#942F70",
                  color: "white",
                  lineHeight: 1.3,
                  fontSize: 48,
                  fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
                  letterSpacing: 0,
                  fontWeight: 700,
                  boxDecorationBreak: "clone",
                  boxShadow: "10px 0 0 #942F70, -10px 0 0 #942F70;",
                }}
              >
                {formValue.title}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                width={48}
                height={48}
                src="/assets/calendar.png"
                alt="calendar"
              />
              <Typography
                sx={{ color: "#333333", fontSize: 28, fontWeight: 600 }}
              >
                {startAt.date}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                width={48}
                height={48}
                src="/assets/clock.png"
                alt="clock"
              />
              <Typography
                sx={{ color: "#333333", fontSize: 28, fontWeight: 600 }}
              >
                {startAt.time}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Image
              width={24}
              height={24}
              src="/assets/location-marker.png"
              alt="location"
            />
            <Typography
              sx={{ color: "#333333", fontSize: 16, fontWeight: 600 }}
            >
              {data.venue}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                width={24}
                height={24}
                src="/assets/user-group.png"
                alt="user-group"
              />
              <Typography
                sx={{ color: "#333333", fontSize: 16, fontWeight: 600 }}
              >
                {data.capacity} people
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                width={24}
                height={24}
                src="/assets/currency-dollar.png"
                alt="cost"
              />
              <Typography
                sx={{ color: "#333333", fontSize: 16, fontWeight: 600 }}
              >
                ${data.price}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "50%",
            height: 445,
            borderRadius: "0px 64px",
            display: "flex",
            backgroundImage: `url(${formValue.banner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>

      <Box>
        <TextareaAutosize
          value={data.description}
          className={styles.textarea}
        />
      </Box>
    </>
  );
}
