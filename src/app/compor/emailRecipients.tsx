"use client";
import * as XLSX from "xlsx";
import AddRecipient from "./handleGuestList/AddRecipient";
import useComporStore from "@/state-store/compor-store";
import RegisteredRecipients from "./handleGuestList/RegisteredRecipients";
import { useRef } from "react";

export default function EmailRecipients() {
  const { guestList, updateGuestList } = useComporStore();
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
    <section className="p-20 max-w-[1500px] mx-auto">
      <p className="text-2xl font-bold text-neutral-600 border-2 border-b-0 p-2">
        {guestList.length} Recipientes
      </p>
      <div className="bg-gray-50 border-2 border-t-0">
        <RegisteredRecipients />
        <AddRecipient />
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

      <div className="mt-0 border-2 border-t-0 p-2 shadow-lg">
        <button
          onClick={handleProxyClick}
          className="border border-neutral-800 my-2 py-2 px-4 w-52 rounded-lg bg-neutral-100 font-bold"
        >
          UPLOAD DE EXCEL
        </button>
        <div className="text-neutral-600">
          <p>
            <b>Atenção!</b>
            <br />
            Sua lista de convidados deve exister na primeira aba do seu excel
          </p>
          <p>
            <b>A lista deve</b> iniciar na linha 1
          </p>
          <p>
            <b>Coluna A</b> - Deve conter nomes
          </p>
          <p>
            <b>Coluna B</b> - Deve conter emails
          </p>
        </div>
      </div>
    </section>
  );
}
