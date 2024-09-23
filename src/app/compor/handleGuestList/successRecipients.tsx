import useEmailStatusTrackerStore from "@/state-store/email-status-tracker-store";

export default function SuccessRecipients() {
  const { successEmail } = useEmailStatusTrackerStore();

  return successEmail.map((guest, guestIndex) => {
    return (
      
      <div key={guestIndex} className="flex w-full">
        <input
          className="px-2 border border-green-600 border-r-0 grow bg-es-offwhite shadow-retro-4x4 text-green-600 focus:outline-none"
          type="text"
          name="guest-name"
          placeholder="Nome"
          value={guest.name}
          readOnly
        />
        <input
          className="px-2 border border-green-600 grow bg-es-offwhite shadow-retro-4x4 text-green-600 focus:outline-none"
          type="text"
          name="guest-email"
          placeholder="Email"
          value={guest.email}
          readOnly
        />
      </div>
    );
  });
}
