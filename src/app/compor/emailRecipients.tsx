import * as XLSX from "xlsx";
import AddRecipients from "./handleGuestList/addRecipients";
import RegisteredRecipients from "./handleGuestList/registeredRecipients";
import { useRef } from "react";
import ComporSectionContainer from "./comporSectionContainer";
import Button from "../shared/button";
import Tooltip from "../shared/tooltip";
import useEmailEditorStore from "@/state-store/email-editor-store";

export default function EmailRecipients() {
  const { guestList, updateGuestList } = useEmailEditorStore();
  const excelInputRef = useRef<HTMLInputElement>(null);

  const handleProxyClick = () => {
    excelInputRef.current?.click();
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target || !e.target.result) return;

      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      if (!worksheet["!ref"]) return;

      const columnsAB = [];
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let row = range.s.r; row <= range.e.r; row++) {
        if (row > 10_000) return;

        const cellA = worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })]; // Column A
        const cellB = worksheet[XLSX.utils.encode_cell({ r: row, c: 1 })]; // Column B

        columnsAB.push({
          name: cellA ? cellA.v : undefined,
          email: cellB ? cellB.v : undefined,
        });
      }

      updateGuestList(columnsAB);
    };

    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  return (
    <ComporSectionContainer className="flex flex-col gap-4">
      <p className="text-2xl font-bold text-neutral-800">
        {guestList.length} Recipientes
      </p>
      <div>
        <RegisteredRecipients />
        <AddRecipients />
      </div>

      <div>
        <input
          ref={excelInputRef}
          className="hidden"
          onChange={handleExcelUpload}
          type="file"
          id="excelFile"
          accept=".xlsx, .xls"
        />
      </div>

      <div className="flex gap-6 items-center">
        <Button
          className="!w-40 !h-12 !text-lg !p-0 !rounded-md text-neutral-800"
          variant="neutral"
          onMouseDown={handleProxyClick}
        >
          Upload Excel
        </Button>
        <Tooltip title="Sobre o upload" position="right">
          <u>Crie a lista na primeira aba do arquivo</u> <br />
          Iniciando na primeira linha: <br />
          Coluna A deve conter os nomes <br />
          Coluna B deve conter os emails
        </Tooltip>
      </div>
    </ComporSectionContainer>
  );
}
