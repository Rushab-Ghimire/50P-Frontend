import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import SignInModal from "../../dialogs/SignIn";
import { useSearchParams } from "react-router-dom";
import SignUpModal from "../../dialogs/SignUp";

const UserAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState("patient");
  const handleOpenSignup = (m) => {
    setMode(m);
    setIsOpenModal(true);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const modeOpen = searchParams.get("mode");
  React.useEffect(() => {
    window.handleOpenSignup = handleOpenSignup;
    if (modeOpen) {
      if (modeOpen == "signin") {
        setIsOpen(true);
      } else if (modeOpen == "signup") {
        window.handleOpenSignup("patient");
      }
    }
  }, [modeOpen]);

  return (
    <>
      <JumboIconButton elevation={23} onClick={() => handleOpen()}>
        <AccountCircleOutlinedIcon sx={{ color: Colors.primary }} />
      </JumboIconButton>

      <SignUpModal
        mode={mode}
        isDialogOpened={isOpenModal}
        handleCloseDialog={() => setIsOpenModal(false)}
      />

      <SignInModal
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
};

export default UserAccount;
