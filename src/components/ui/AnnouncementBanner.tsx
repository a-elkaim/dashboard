import InlineLink from "@components/InlineLink";
import { cn } from "@utils/helpers";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowRightIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useAnnouncement } from "@/contexts/AnnouncementProvider";

const variants = cva(
  {},
  {
    variants: {
      variant: {
        default:
          "bg-neutral-100 border-neutral-200 text-neutral-700 dark:bg-nb-gray-900/50 dark:border-nb-gray-800/30 dark:text-nb-gray-200 border-b",
        important:
          "bg-netbird-200 text-netbird-900 font-normal dark:bg-gradient-to-b dark:from-netbird dark:to-netbird-400 dark:text-black",
      },
      tagBadge: {
        default:
          "bg-neutral-200 text-neutral-700 dark:bg-nb-gray-200/10 dark:text-nb-gray-100 font-medium",
        important:
          "bg-netbird-900 text-netbird-50 font-medium dark:bg-nb-gray-900 dark:text-nb-gray-200",
      },
      closeButton: {
        default:
          "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-nb-gray-900 dark:text-nb-gray-300 dark:hover:bg-nb-gray-800 rounded-md p-1",
        important:
          "rounded-md p-1 bg-netbird-300/60 text-netbird-900 hover:bg-netbird-300 dark:bg-netbird dark:text-black dark:hover:bg-nb-gray-900 dark:hover:text-nb-gray-200",
      },
      inlineLink: {
        default: "text-nb-blue-500 dark:text-nb-blue-400 hover:underline",
        important:
          "!text-netbird-900 dark:!text-black underline hover:opacity-80",
      },
    },
  },
);

export type AnnouncementVariant = VariantProps<typeof variants>;

export const AnnouncementBanner = () => {
  const { bannerHeight, closeAnnouncement, announcements } = useAnnouncement();
  const announcement = announcements?.find((a) => a.isOpen);

  return announcement ? (
    <div
      className={cn(
        "flex items-center justify-center text-sm px-8 font-light",
        variants({ variant: announcement.variant }),
      )}
      style={{ height: bannerHeight }}
    >
      <div className={"flex items-center gap-2"}>
        {announcement.tag && (
          <div
            className={cn(
              "bg-nb-gray-200/10 backdrop-blur text-nb-gray-100 font-medium tracking-wide uppercase text-[10px] py-2.5 px-2 rounded-md leading-[0]",
              variants({ tagBadge: announcement.variant }),
            )}
          >
            {announcement.tag}
          </div>
        )}
        <div>
          {announcement.text}
          {announcement.link && (
            <InlineLink
              href={announcement.link || "#"}
              target={announcement.isExternal ? "_blank" : undefined}
              className={cn(
                "ml-2 !text-sm",
                variants({ inlineLink: announcement.variant }),
              )}
            >
              {announcement.linkText || "Learn more"}
              <ArrowRightIcon size={14} />
            </InlineLink>
          )}
        </div>
      </div>
      {announcement.closeable && (
        <div className={"absolute right-0 px-4"}>
          <div
            className={cn(
              "rounded-md p-1 text-nb-gray-300 transition-all cursor-pointer",
              variants({ closeButton: announcement.variant }),
            )}
            onClick={() => closeAnnouncement(announcement.hash)}
          >
            <XIcon size={14} />
          </div>
        </div>
      )}
    </div>
  ) : null;
};
