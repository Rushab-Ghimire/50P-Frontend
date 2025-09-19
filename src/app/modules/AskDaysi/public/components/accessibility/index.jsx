import React, { useState } from "react";
import { Button, Typography, Box, Menu, MenuItem } from "@mui/material";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import TextIncreaseOutlinedIcon from "@mui/icons-material/TextIncreaseOutlined";
import TextDecreaseOutlinedIcon from "@mui/icons-material/TextDecreaseOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

var style;
var fS;
var fUnit;

const Accessibility = ({ fontSize, setFontSize }) => {
  const fontSizes = ["UP", "DOWN", "RESET", "DARK", "LIGHT"];
  // const [fontSize, setFontSize] = useState(16); // Default font size
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFontSizeChange = (size) => {
    recurseDomChildren(document.documentElement, true, size);
    handleClose();
  };

  function recurseDomChildren(start, output, size) {
    var nodes;
    if (start.childNodes) {
      nodes = start.childNodes;
      loopNodeChildren(nodes, output, size);
    }
  }

  function loopNodeChildren(nodes, output, size) {
    var node;
    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];
      if (output) {
        outputNode(node, size);
      }
      if (node.childNodes) {
        recurseDomChildren(node, output, size);
      }
    }
  }

  function outputNode(node, size) {
    var whitespace = /^\s+$/g;
    if (node.nodeType === 1) {
      style = window.getComputedStyle(node);
      fS = parseFloat(style.fontSize);
      fUnit = style.fontSize.replace(fS, "");
      if (node.style.oldFontSize === undefined) {
        node.style.oldFontSize = style.fontSize;
      }
      if (size == "UP") {
        if (fUnit == "px") {
          fS += 3;
        } else {
          fS += 2 / 10;
        }
        node.style.fontSize = fS + fUnit;
      } else if (size == "DOWN") {
        if (fUnit == "px") {
          fS -= 3;
        } else {
          fS -= 2 / 10;
        }
        node.style.fontSize = fS + fUnit;
      } else if (size == "RESET") {
        node.style.fontSize = node.style.oldFontSize;
      } else if (size == "DARK") {
        node.classList.add("high-contrast");
      } else if (size == "LIGHT") {
        node.classList.remove("high-contrast");
      }
    }
  }

  const btnStyle = {
    color: Colors.gray_1,
  };
  return (
    <Box sx={{ display: "flex", padding: "4px 0" }}>
      <Button onClick={() => handleFontSizeChange("UP")} sx={btnStyle}>
        <TextIncreaseOutlinedIcon />
      </Button>
      <Button onClick={() => handleFontSizeChange("DOWN")} sx={btnStyle}>
        <TextDecreaseOutlinedIcon />
      </Button>
      <Button onClick={() => handleFontSizeChange("RESET")} sx={btnStyle}>
        <FormatColorTextOutlinedIcon />
      </Button>
    </Box>

    /*  <Box sx={{ padding: 2, mr: { xs: -1, md: 0.5 } }}>
 
      <JumboIconButton onClick={handleClick} elevation={23}>
        <AccessibilityNewOutlinedIcon sx={{ color: "#0399e3" }} />
      </JumboIconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={() => handleFontSizeChange("UP")} sx={btnStyle}>
            <TextIncreaseOutlinedIcon />
          </Button>
          <Button onClick={() => handleFontSizeChange("DOWN")} sx={btnStyle}>
            <TextDecreaseOutlinedIcon />
          </Button>
          <Button onClick={() => handleFontSizeChange("RESET")} sx={btnStyle}>
            <FormatColorTextOutlinedIcon />
          </Button>
          {/* <Button onClick={() => handleFontSizeChange("DARK")}>DARK</Button>
        <Button onClick={() => handleFontSizeChange("LIGHT")}>LIGHT</Button> 
        </Box>
      </Menu> 
    }
    </Box>*/
  );
};

export default Accessibility;
