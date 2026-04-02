import {
  IconMail,
  IconLinkedin,
  IconInstagram,
  IconWhatsapp,
  IconGithub,
  IconExternal,
  IconFiverr,
  IconUnjob,
} from "@/components/Icons";

const Icon = ({ name }) => {
  switch (name) {
    case "mail":
      return <IconMail />;
    case "github":
      return <IconGithub />;
    case "linkedin":
      return <IconLinkedin />;
    case "instagram":
      return <IconInstagram />;
    case "whatsapp":
      return <IconWhatsapp />;
    case "fiverr":
      return <IconFiverr />;
    case "unjob":
      return <IconUnjob />;
    default:
      return <IconExternal />;
  }
};

export default Icon;
