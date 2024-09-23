import { centerAlignmentIcon, imageIcon, leftAlignmentIcon, rightAlignmentIcon } from "@/assets/icons/hero-icons";
import useEmailEditorStore from "@/state-store/email-editor-store";
import { RefObject, useCallback, useRef } from "react";

export default function EditorControls() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorIndicatorLetterRef = useRef<HTMLParagraphElement>(null);
  const { editorRef, setBase64Image, setCorpoDoEmail } = useEmailEditorStore();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) insertImage(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleProxyUploadImage = (
    fileInputRef: RefObject<HTMLInputElement>
  ) => {
    if (editorRef?.current?.querySelector("img")) {
      alert("Máximo de 1 imagem por email");
      return;
    }
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const insertImage = (file: File) => {
    if (file.type !== "image/png") {
      alert("Apenas images tipo .PNG são suportadas");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("Seu arquivo deve ter menos de 9MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      setBase64Image(e.target?.result as string);

      const img = document.createElement("img");
      img.src = e.target?.result as string;
      img.alt = "email-image";
      img.style.width = "120px";
      img.style.margin = "0 auto";

      const emailEditor = editorRef?.current;
      if (emailEditor) emailEditor.append(img);
    };
    reader.readAsDataURL(file);
  };

  const applyFontFormat = useCallback(
    (fontName: string, value: any | undefined = undefined) => {
      if (editorRef?.current) {
        editorRef.current.focus();
        document.execCommand(fontName, false, value);
        setCorpoDoEmail(editorRef.current.innerHTML);
      }
    },
    [setCorpoDoEmail, editorRef]
  );

  const applyAlignment = useCallback(
    (alignment: "justifyLeft" | "justifyCenter" | "justifyRight") => {
      if (editorRef?.current) {
        editorRef.current.focus();
        document.execCommand("formatBlock", false, "div");
        document.execCommand("justifyLeft", false, undefined);
        document.execCommand("justifyCenter", false, undefined);
        document.execCommand("justifyRight", false, undefined);
        document.execCommand(alignment, false, undefined);
        setCorpoDoEmail(editorRef.current.innerHTML);
      }
    },
    [setCorpoDoEmail, editorRef]
  );

  const applyColor = useCallback(
    (color: string) => {
      if (editorRef?.current) {
        editorRef.current.focus();
        document.execCommand("foreColor", false, color);
        setCorpoDoEmail(editorRef.current.innerHTML);

        if (colorIndicatorLetterRef.current)
          colorIndicatorLetterRef.current.style.color = color;
      }
    },
    [setCorpoDoEmail, editorRef]
  );

  return (
    <article className="h-16 bg-es-offwhite flex items-center px-6 pt-4 gap-8">
      <div className="border border-black rounded-md">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <div
          className="bg-white rounded-md px-1 cursor-pointer"
          onClick={() => handleProxyUploadImage(fileInputRef)}
        >
          {imageIcon("32px")}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => applyFontFormat("bold")}
          className="bg-white w-8 h-8 font-extrabold border border-black rounded-md"
        >
          n
        </button>
        <button
          onClick={() => applyFontFormat("italic")}
          className="bg-white pr-1 w-8 h-8 italic border border-black rounded-md"
        >
          i
        </button>
        <button
          onClick={() => applyFontFormat("underline")}
          className="bg-white w-8 h-8 underline border border-black rounded-md"
        >
          s
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => applyAlignment("justifyLeft")}
          className="bg-white w-8 h-8 font-extrabold border border-black rounded-md"
        >
          {leftAlignmentIcon("28px")}
        </button>
        <button
          onClick={() => applyAlignment("justifyCenter")}
          className="bg-white w-8 h-8 font-extrabold flex items-center justify-center border border-black rounded-md"
        >
          {centerAlignmentIcon("24px")}
        </button>
        <button
          onClick={() => applyAlignment("justifyRight")}
          className="bg-white w-8 h-8 pl-1 font-extrabold border border-black rounded-md"
        >
          {rightAlignmentIcon("28px")}
        </button>
      </div>

      <div className="flex gap-4">
        <select
          className="w-20 truncate text-base border border-black rounded-md"
          onChange={(e) => {
            applyFontFormat("fontName", e.target.value);
            e.target.value = "";
          }}
        >
          <option className="hidden" value="">
            Font
          </option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>

        <select
          className="w-20 truncate text-base border border-black rounded-md"
          onChange={(e) => {
            applyFontFormat("fontSize", e.target.value);
            e.target.value = "";
          }}
        >
          <option className="hidden" value="">
            Size
          </option>
          <option value="3">normal</option>
          <option value="5">médio</option>
          <option value="6">Grande</option>
          <option value="7">XGrande</option>
        </select>
      </div>

      <div className="flex gap-1 px-2 bg-white border border-black rounded-md">
        <p ref={colorIndicatorLetterRef}>A</p>
        <input
          className="w-8"
          onChange={(e) => applyColor(e.target.value)}
          type="color"
        />
      </div>
    </article>
  );
}
