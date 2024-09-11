import { cn } from "@/lib/utils";
import { ExtendedMessages } from "@/types/message";
import { format } from "date-fns";
import { BirdIcon, UserIcon } from "lucide-react";
import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MessageProps {
  message: ExtendedMessages;
  isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-end", {
          "justify-end": message.isUserMessage,
        })}
      >
        <div
          className={cn(
            "relative flex h-6 w-6 aspect-square items-center justify-center",
            {
              "order-2 bg-blue-600 rounded-sm": message.isUserMessage,
              "order-1 bg-zinc-800 rounded-sm": !message.isUserMessage,
              invisible: isNextMessageSamePerson,
            }
          )}
        >
          {message.isUserMessage ? (
            <UserIcon className="h-4 w-4 text-white " />
          ) : (
            <BirdIcon className="h-4 w-4 text-white " />
          )}
        </div>

        <div
          className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
            "order-1 items-end": message.isUserMessage,
            "order-2 items-start": !message.isUserMessage,
          })}
        >
          <div
            className={cn(
              "px-4 py-2 rounded-lg inline-block dark:bg-slate-800 dark:text-white",
              {
                "bg-blue-600 text-white dark:bg-slate-800 dark:text-white":
                  message.isUserMessage,
                "bg-gray-200 text-gray-900  dark:bg-slate-700 dark:text-white":
                  !message.isUserMessage,
                "rounded-br-none":
                  !isNextMessageSamePerson && message.isUserMessage,
                "rounded-bl-none":
                  !isNextMessageSamePerson && !message.isUserMessage,
              }
            )}
          >
            {typeof message.text === "string" ? (
              <div>
                <ReactMarkdown
                  className={cn(
                    "prose dark:prose-headings:text-white  dark:text-white text-white",
                    {
                      "text-zinc-50 ": message.isUserMessage,
                    }
                  )}
                  components={{
                    strong: ({ children }) => <strong>{children}</strong>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote>{children}</blockquote>
                    ),
                    code: (props) => {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          {...rest}
                          PreTag="div"
                          language={match[1]}
                          style={dark}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkMath]}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            ) : (
              message.text
            )}
            {message.id !== "loading-message" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full text-right">
                    <div
                      className={cn(
                        "text-xs select-none mt-2 w-full text-right",
                        {
                          "text-zinc-500 dark:text-white":
                            !message.isUserMessage,
                          "text-blue-300 ": message.isUserMessage,
                        }
                      )}
                    >
                      {format(new Date(message.createdAt), "HH:mm")}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;
