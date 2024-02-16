import { useCallback } from "react";
import ButtonPad from "../shared/ButtonPad";
import BackgroundIcon from "../shared/images/BackgroundIcon";
import BannyBodyIcon from "../shared/images/BannyBodyIcon";
import HeadgearIcon from "../shared/images/HeadgearIcon";
import OutfitIcon from "../shared/images/OutfitIcon";
import SwordIcon from "../shared/images/SwordIcon";
import { AssetType } from "./Controls";
import { COLORS } from "@/constants/colors";
import { act } from "react-dom/test-utils";
import Fuzz from "../Fuzz";
import ButtonPadLight from "../shared/ButtonPadLight";

export default function AssetButton({
  asset,
  active,
  onClick,
}: {
  asset: AssetType;
  active?: boolean;
  onClick?: VoidFunction;
}) {
  const Icon = useCallback(() => {
    switch (asset) {
      case "BACKGROUND":
        return <BackgroundIcon active />;
      case "BODY":
        return <BannyBodyIcon active />;
      case "HEADGEAR":
        return <HeadgearIcon active />;
      case "OUTFIT":
        return <OutfitIcon active />;
      case "GRIP_RIGHT":
        return <SwordIcon active />;
    }
  }, [asset]);

  return (
    <ButtonPadLight
      style={{ width: 100, height: 100 }}
      fillFg={COLORS.banana}
      onClick={onClick}
      active={active}
    >
      <Icon />
    </ButtonPadLight>
  );
}
