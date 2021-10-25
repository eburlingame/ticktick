import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export type CopyableButtonProps = {
  text: string;
};

const CopyableButton = ({ text }: CopyableButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <button>{copied ? "Copied!" : "Copy SVG to clipboard"}</button>
    </CopyToClipboard>
  );
};

export default CopyableButton;
