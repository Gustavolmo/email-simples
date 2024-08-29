"use client";
import * as XLSX from "xlsx";
import AddRecipient from "./AddRecipient";
import useComporStore from "@/state-store/compor/compor-store";
import RegisteredRecipients from "./RegisteredRecipients";
import { useRef } from "react";

export default function EmailRecipients() {
  const { guestList, updateGuestList } = useComporStore();
  const excelInputRef = useRef<HTMLInputElement>(null);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      if (!e.target || !e.target.result) return;
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      if (!worksheet["!ref"]) return;
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      const columnsAB = [];
      for (let row = range.s.r; row <= range.e.r; row++) {
        if (row > 10_000) return;
        const cellA = worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })]; // Column A
        const cellB = worksheet[XLSX.utils.encode_cell({ r: row, c: 1 })]; // Column B
        columnsAB.push({
          name: cellA ? cellA.v : undefined,
          email: cellB ? cellB.v : undefined,
        });
      }
      columnsAB.map((guest) => {
        guest.email.trim();
        guest.name.trim();
      });
      updateGuestList(columnsAB);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleProxyClick = () => {
    excelInputRef.current?.click();
  };

  return (
    <section className="p-20 max-w-[1500px] mx-auto">
      <div className="bg-white mt-10 p-6 rounded-md">
        <p className="text-2xl mb-2">{guestList.length} Recipientes:</p>

        {guestList.map((guest, index) => (
          <span key={index}>
            <RegisteredRecipients name={guest.name} email={guest.email} />
          </span>
        ))}
        <div className="flex items-center">
          <AddRecipient />
        </div>
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
        <button
          onClick={handleProxyClick}
          className="border border-black my-2 py-2 px-4 w-52 bg-white"
        >
          UPLOAD DE EXCEL
        </button>
        <p>
          <b>Atenção!</b> Sua lista de convidados deve exister na primeira aba
          do seu excel
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
    </section>
  );
}
