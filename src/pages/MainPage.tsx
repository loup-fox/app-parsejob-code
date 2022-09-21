import { AppBar } from "@mui/material";
import { useParams } from "react-router";
import * as Spaces from "react-spaces";
import { TopBar } from "../components/TopBar";

export const MainPage = () => {
  const { parserName = null } = useParams();
  return (
    <Spaces.ViewPort style={{ display: "flex" }}>
      <Spaces.Top size={64}>
        <TopBar />
      </Spaces.Top>
    </Spaces.ViewPort>
  );
};
