import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";

const stepIcons = {
  1: <AccountBoxIcon />,
  2: <WorkIcon />,
  3: <SupervisorAccountIcon />,
  4: <MonetizationOnIcon />,
  5: <GroupIcon />,
  6: <DescriptionIcon />,
  7: <HistoryIcon />,
};

const CustomStepIcon = ({ icon, active, completed }) => (
  <div
    style={{
      color: active || completed ? "#055063" : "#ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
    }}
  >
    {stepIcons[icon]}
  </div>
);

export default CustomStepIcon;
