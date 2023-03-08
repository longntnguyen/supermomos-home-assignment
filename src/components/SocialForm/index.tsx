import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { useState } from "react";
import TextField from "@/components/TextField";
import styles from "./index.module.css";
import ModalSelectImage from "./ModalSelectImage";

type TSelectItem = {
  value: string;
  onClick: (data: string) => void;
};
const SelectedTag = ({ value, onClick }: TSelectItem) => {
  return (
    <Box
      sx={{
        color: "#344054",
        background: "#F9F5FF",
        px: 2,
        py: 0.5,
        borderRadius: 4,
        mixBlendMode: "multiply",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
        }}
      >
        {value}
      </Typography>
      <Image
        src="/assets/x-close.png"
        alt="x-close"
        width={12}
        height={12}
        onClick={() => onClick(value)}
      />
    </Box>
  );
};

const SelectTag = ({ value, onClick }: TSelectItem) => {
  return (
    <Box
      sx={{
        color: "#344054",
        background: "#F2F4F7",
        px: 2,
        py: 0.5,
        borderRadius: 4,
        mixBlendMode: "multiply",
        cursor: "pointer",
        fontFamily: "Inter",
        fontSize: 14,
      }}
      onClick={() => onClick(value)}
    >
      {value}
    </Box>
  );
};

export type TSocialForm = {
  title: string;
  time: string;
  date: string;
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

export default function SocialForm({
  setData,
}: {
  setData: (data: TSocialForm) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOpen = () => setOpen(true);
  const [formValue, setFormValue] = useState<TSocialForm>({
    title: "Untitle Event",
    isManualApprove: false,
    price: 0,
  } as TSocialForm);
  const [listTagSelected, setListTagSelected] = useState(["Engineering"]);
  const [listTag, setListTag] = useState(["Product", "Design", "Marketing"]);

  const isFormValidate = () => {
    const { title, time, date, venue, capacity, description, privacy, banner } =
      formValue;
    return (
      !!title &&
      !!time &&
      !!date &&
      !!venue &&
      !!capacity &&
      !!description &&
      !!privacy &&
      !!banner &&
      !!listTagSelected.length
    );
  };

  const handleChangeForm = (value: any, name: string) => {
    setFormValue((valueForm) => ({ ...valueForm, [name]: value }));
  };

  const handleSelectTag = (value: string) => {
    const newSelectTags = listTag.filter((tag) => value !== tag);
    setListTag(newSelectTags);
    setListTagSelected((tags) => [...tags, value]);
  };

  const handleDeleteTag = (value: string) => {
    const newSelectTags = listTagSelected.filter((tag) => value !== tag);
    setListTagSelected(newSelectTags);
    setListTag((tags) => [...tags, value]);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (!isFormValidate()) return;
    setIsLoading(true);
    const startAt = new Date(
      `${formValue.date}T${formValue.time}`
    ).toISOString();
    const { time, date, ...requestData } = formValue;
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        ...requestData,
        startAt,
        tags: listTagSelected,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (response) setData(response);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ maxWidth: "50%" }}>
          <Box>
            {!formValue.title && isSubmitted && (
              <Typography sx={{ color: "red" }}>
                Title can not be empty
              </Typography>
            )}
            <Box sx={{ position: "relative", mb: 2, minHeight: 70 }}>
              <Box
                sx={{
                  width: "100%",
                  fontSize: 48,
                  fontFamily: "monospace",
                  wordWrap: "break-word",
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
                    fontFamily: '"Neue Haas Grotesk Display Pro", sans-serif',
                    letterSpacing: 0,
                    boxDecorationBreak: "clone",
                    boxShadow: "10px 0 0 #942F70, -10px 0 0 #942F70;",
                  }}
                >
                  {formValue.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  "textarea:focus-visible": {
                    outline: "none!important",
                  },
                }}
              >
                <TextareaAutosize
                  className={styles.textarea}
                  value={formValue.title}
                  onChange={(e) => {
                    if (
                      !e.target.value.includes("\n") &&
                      !e.target.value.includes("  ")
                    ) {
                      handleChangeForm(e.target.value, "title");
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              mb: 2,
              ["input"]: {
                width: 200,
                height: 40,
              },
              [theme.breakpoints.down("lg")]: {
                ["input"]: {
                  width: 150,
                  height: 40,
                },
              },
            })}
          >
            <TextField
              errorMessage={
                !formValue.date && isSubmitted ? "Required" : undefined
              }
              label={
                <Image
                  width={48}
                  height={48}
                  src="/assets/calendar.png"
                  alt="calendar"
                />
              }
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => handleChangeForm(e.target.value, "date")}
              type="text"
              placeholder="Date"
              id="Date"
              name="Date"
            />
            <TextField
              label={
                <Image
                  width={48}
                  height={48}
                  src="/assets/clock.png"
                  alt="clock"
                />
              }
              errorMessage={
                !formValue.time && isSubmitted ? "Required" : undefined
              }
              onFocus={(e) => (e.target.type = "time")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => handleChangeForm(e.target.value, "time")}
              placeholder="Time"
              type="time"
              id="time"
              name="time"
            />
          </Box>
          <TextField
            label={
              <Image
                width={24}
                height={24}
                src="/assets/location-marker.png"
                alt="location"
              />
            }
            errorMessage={
              !formValue.venue && isSubmitted ? "Required" : undefined
            }
            style={{ width: "100%", height: "40px" }}
            placeholder="Location"
            onChange={(e) => handleChangeForm(e.target.value, "venue")}
            type="text"
            id="location"
            name="location"
          />

          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              mt: 2,
              ["input"]: {
                width: 200,
                height: 40,
              },
              [theme.breakpoints.down("lg")]: {
                ["input"]: {
                  width: 150,
                  height: 40,
                },
              },
            })}
          >
            <TextField
              label={
                <Image
                  width={24}
                  height={24}
                  src="/assets/user-group.png"
                  alt="user-group"
                />
              }
              errorMessage={
                !formValue.capacity && isSubmitted ? "Required" : undefined
              }
              type="number"
              onChange={(e) => handleChangeForm(e.target.value, "capacity")}
              placeholder="Max capacity"
              id="max-capacity"
              name="Max capacity"
            />
            <TextField
              label={
                <Image
                  width={24}
                  height={24}
                  src="/assets/currency-dollar.png"
                  alt="cost"
                />
              }
              placeholder="Cost per person"
              onChange={(e) => handleChangeForm(e.target.value, "price")}
              type="number"
              id="cost"
              name="cost"
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
          }}
        >
          {!formValue.banner && isSubmitted && (
            <Typography sx={{ color: "red" }}>Required</Typography>
          )}
          <Box
            sx={{
              width: "100%",
              height: 445,
              cursor: "pointer",
              ...(!formValue.banner && {
                border: "1px dashed #F2F2F2",
                background: "rgba(242, 242, 242, 0.1);",
              }),
              borderRadius: "0px 64px",
              display: "flex",
              ...(formValue.banner && {
                backgroundImage: `url(${formValue.banner})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }),
            }}
            onClick={handleOpen}
          >
            {!formValue.banner && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                  gap: 2,
                }}
              >
                <Image
                  src="/assets/picture.png"
                  alt="picture-selector"
                  height={24}
                  width={24}
                />
                <Typography>Add a banner</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <ModalSelectImage
          open={open}
          onClose={() => setOpen(false)}
          onSave={(imgUrl) => handleChangeForm(imgUrl, "banner")}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          fontFamily: "Inter",
          width: 600,
        }}
      >
        <label htmlFor="description">Description</label>
        <Box sx={{ width: "100%" }}>
          <TextareaAutosize
            className={styles.description}
            onChange={(e) => handleChangeForm(e.target.value, "description")}
            minRows={10}
            placeholder="Description of your event.."
            id="description"
            name="description"
          />
          {!formValue.description && isSubmitted && (
            <Typography sx={{ color: "red" }}>Required</Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          background: "white",
          p: 3,
          borderRadius: 2.5,
          mb: 4,
          width: 600,
        }}
      >
        <Typography
          sx={{
            background: "#FEF452",
            px: 1.5,
            width: 150,
            color: "#942F70",
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
          }}
        >
          Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  handleChangeForm(e.target.checked, "isManualApprove")
                }
              />
            }
            label="I want to approve attendees"
          />
        </FormGroup>
        <FormControl>
          <Typography sx={{ color: "#344054", fontSize: 16 }}>
            Privacy
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => handleChangeForm(e.target.value, "privacy")}
            sx={{ display: "flex", flexDirection: "row", gap: 2 }}
          >
            <FormControlLabel
              value="Curated Audience"
              control={<Radio />}
              label="Curated Audience"
            />
            <FormControlLabel
              value="Public"
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="Community Only"
              control={<Radio />}
              label="Community Only"
            />
          </RadioGroup>
          {!formValue.privacy && isSubmitted && (
            <Typography sx={{ color: "red", mb: 2 }}>Required</Typography>
          )}
        </FormControl>
        <Box>
          <Typography>Tag your social</Typography>
          <Typography sx={{ mb: 2, color: "#475467" }}>
            Pick tags for our curation engine to work its magin
          </Typography>
          {!listTagSelected.length && isSubmitted && (
            <Typography sx={{ mb: 2, color: "red" }}>
              Please pick 1 tag
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {listTagSelected.map((tag) => (
              <SelectedTag
                key={tag}
                value={tag}
                onClick={() => handleDeleteTag(tag)}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {listTag.map((tag) => (
              <SelectTag
                key={tag}
                value={tag}
                onClick={() => handleSelectTag(tag)}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <LoadingButton
        sx={{
          background: "#FEF452",
          color: "#942F70",
          fontSize: 16,
          width: 600,
          fontFamily: "Inter",
          "&:hover": { background: "#fef452b3" },
        }}
        loading={isLoading}
        onClick={handleSubmit}
      >
        CREATE SOCIAL
      </LoadingButton>
    </>
  );
}
