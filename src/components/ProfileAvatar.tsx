import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  SwipeableDrawer,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  AddRounded,
  AdjustRounded,
  BugReportRounded,
  CategoryRounded,
  Favorite,
  GetAppRounded,
  GitHub,
  Logout,
  SettingsRounded,
  StarRounded,
  TaskAltRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { defaultUser } from "../constants/defaultUser";
import { SettingsDialog } from ".";
import toast from "react-hot-toast";
import logo from "../assets/logo256.png";
import { ColorPalette } from "../styles";
import { UserContext } from "../contexts/UserContext";
import { iOS } from "../utils/iOS";

export const ProfileAvatar = () => {
  const { user, setUser } = useContext(UserContext);
  const n = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const [stars, setStars] = useState<number | null>(null);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.getElementById("root")?.setAttribute("aria-sidebar", "true");
  };

  const handleClose = () => {
    setAnchorEl(null);
    document.getElementById("root")?.removeAttribute("aria-sidebar");
  };

  const handleLogoutConfirmationClose = () => {
    setLogoutConfirmationOpen(false);
  };

  function timeAgo(arg0: Date): import("react").ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <Container>
      <Tooltip title={user.name || "User"} translate="no">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ zIndex: 1 }}
        >
          <Avatar
            src={(user.profilePicture as string) || undefined}
            alt={user.name || "User"}
            onError={() => {
              setUser((prevUser: any) => ({
                ...prevUser,
                profilePicture: null,
              }));

              toast.error("Error in profile picture URL");
              throw new Error("Error in profile picture URL");
            }}
            sx={{
              width: "52px",
              height: "52px",
              background: user.profilePicture ? "#ffffff1c" : "#747474",
              transition: ".2s all",
              fontSize: "26px",
            }}
          >
            {user.name ? user.name[0].toUpperCase() : undefined}
          </Avatar>
        </IconButton>
      </Tooltip>
      <StyledSwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        id="basic-menu"
        // anchorEl={anchorEl}
        anchor="right"
        open={open}
        onOpen={() => console.log("")}
        onClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
      >
        <LogoContainer
          translate="no"
          onClick={() => {
            n("/");
            handleClose();
          }}
        >
          <Logo src={logo} alt="logo" />
          <h2>
            <span style={{ color: "#7764E8" }}>Todo</span> App
            <span style={{ color: "#7764E8" }}>.</span>
          </h2>
        </LogoContainer>

        <StyledMenuItem
          onClick={() => {
            n("/");
            handleClose();
          }}
          sx={{ mt: "16px !important" }}
        >
          <TaskAltRounded /> &nbsp; Tasks
          {user.tasks.filter((task: { done: any; }) => !task.done).length > 0 && (
            <MenuLabel>
              {user.tasks.filter((task: { done: any; }) => !task.done).length > 99
                ? "99+"
                : user.tasks.filter((task: { done: any; }) => !task.done).length}
            </MenuLabel>
          )}
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            n("/add");
            handleClose();
          }}
        >
          <AddRounded /> &nbsp; Add Task
        </StyledMenuItem>
        <Divider sx={{ margin: "0 8px" }} />

        <div
          style={{
            marginTop: "auto",
            // marginLeft: "18px",
            marginBottom: iOS ? "38px" : "18px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <StyledMenuItem
            sx={{
              background: "#101727",
              color: "white !important",
              mt: "8px !important",
              "&:hover": {
                background: "#101727db !important",
              },
            }}
            onClick={() => {
              setOpenSettings(true);
              handleClose();
            }}
          >
            <SettingsRounded /> &nbsp; Settings
          </StyledMenuItem>
        </div>
      </StyledSwipeableDrawer>
      <SettingsDialog open={openSettings} onClose={() => setOpenSettings(!openSettings)} />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 16vw;
  top: 14px;
  z-index: 900;
  @media (max-width: 1024px) {
    right: 16px;
  }
`;

const StyledSwipeableDrawer = styled(SwipeableDrawer)`
  & .MuiPaper-root {
    border-radius: 24px 0 0 0;
    min-width: 300px;
    box-shadow: none;
    padding: 4px;
    background: #f9fafc;
    z-index: 999;

    @media (max-width: 1024px) {
      min-width: 270px;
    }
    @media (max-width: 600px) {
      min-width: 55vw;
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  margin: 0px 8px;
  padding: 16px 12px;
  border-radius: 14px;
  box-shadow: none;
  display: flex;
  font-weight: 500;
  color: #101727;

  align-items: center;
  gap: 6px;
  & svg {
    transition: 0.4s transform;
  }
  &:hover {
    background-color: #f0f0f0;
    & svg[data-testid="GitHubIcon"] {
      transform: rotate3d(0, 1, 0, ${2 * Math.PI}rad);
    }
    & svg[data-testid="SettingsRoundedIcon"] {
      transform: rotate(180deg);
    }
  }
`;
const DialogBtn = styled(Button)`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 16px;
  margin: 8px;
`;

const MenuLabel = styled.span<{ clr?: string }>`
  margin-left: auto;
  font-weight: 600;
  background: ${({ clr, theme }) => (clr || theme.primary) + "35"};
  color: ${({ clr, theme }) => clr || theme.primary};
  padding: 2px 12px;
  border-radius: 32px;
  font-size: 14px;
  /* width: 40px;
  text-align: center; */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
  gap: 16px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 52px;
  margin-left: 18px;
`;

const CreditsContainer = styled.div`
  font-size: 12px;
  margin: 0;
  color: #101727c0;

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
