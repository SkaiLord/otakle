import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import { usePathname } from "next/navigation";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaSquareTwitter, FaSquareWhatsapp } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
export const ShareButtonBar = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-x-2">
      <WhatsappShareButton
        url={process.env.NEXT_PUBLIC_SITE_URL + pathname}
        title={
          "Otakle - Think you know your anime characters. Challenge accepted? Play now and let's see who's the ultimate otaku! 🏆"
        }
        separator=":: "
        blankTarget={true}
      >
        <FaSquareWhatsapp
          size={28}
          className="text-crimson h-6 w-6 rounded bg-primary hover:bg-secondary hover:text-primary"
        />
      </WhatsappShareButton>
      <FacebookShareButton
        url={process.env.NEXT_PUBLIC_SITE_URL + pathname}
        quote={
          "Otakle - Think you know your anime characters. Challenge accepted? Play now and let's see who's the ultimate otaku! 🏆"
        }
        hashtag={"#otakle"}
        blankTarget={true}
      >
        <ImFacebook2
          size={28}
          className="text-crimson h-6 w-6 rounded bg-primary hover:bg-secondary hover:text-primary"
        />
      </FacebookShareButton>
      <TwitterShareButton
        url={process.env.NEXT_PUBLIC_SITE_URL + pathname}
        title={
          "Otakle - Think you know your anime characters. Challenge accepted? Play now and let's see who's the ultimate otaku! 🏆"
        }
        hashtags={["otakle", "skailord"]}
        blankTarget={true}
      >
        <FaSquareTwitter
          size={28}
          className="text-crimson h-6 w-6 rounded bg-primary hover:bg-secondary hover:text-primary"
        />
      </TwitterShareButton>
      <LinkedinShareButton
        url={process.env.NEXT_PUBLIC_SITE_URL + pathname}
        blankTarget={true}
      >
        <BsLinkedin
          size={28}
          className="text-crimson h-6 w-6 rounded bg-primary hover:bg-secondary hover:text-primary"
        />
      </LinkedinShareButton>
    </div>
  );
};
