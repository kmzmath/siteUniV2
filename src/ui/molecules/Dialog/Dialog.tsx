import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";

import { Row, Text } from "@/ui/atoms";

import { DialogProps } from "./types";

const Dialog: React.FC<DialogProps> = ({
  title,
  closeDialog,
  children,
  className,
}) => {
  return (
    <div className={twMerge("w-[1200px] max-w-full", className)}>
      <div className="flex flex-col items-center justify-center bg-slate-800 rounded-lg p-4">
        <Row className="items-center justify-between w-full mb-4 gap-2">
          {title && (
            <Text variant="titleMedium" bold className="text-white">
              {title}
            </Text>
          )}

          <FontAwesomeIcon
            icon={faTimes}
            className="w-4 h-4 cursor-pointer"
            onClick={closeDialog}
          />
        </Row>

        {children}
      </div>
    </div>
  );
};

export default Dialog;
