import Footer from "../shared/footet";
import EmailEditor from "./emailEditor";
import EmailRecipients from "./emailRecipients";
import EmailTrackerStatus from "./emailStatusTracker";

export default function ComporBody() {
  return (
    <article className="bg-es-neutral shadow-inset-t-16">
      <div className="h-20"></div>
      <EmailRecipients />
      <EmailEditor />
      <EmailTrackerStatus />
      <div className="h-40"></div>
      <Footer />
    </article>
  );
}
