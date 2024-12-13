import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

const Authors = ({ data, courseSlug }) => {
  const router = useRouter();
  // console.log(router, "em");
  if (!data) {
    return null;
  }

  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:py-12">
        <div className="">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center ">
            {router.pathname == "/cohorts/tech-for-product-managers" ? (
              <h2 className="mt-8 text-center text-3xl font-semibold text-[#101828DE] lg:mt-1 lg:text-[36px] ">
                Meet the instructor
              </h2>
            ) : (
              <h2 className="mt-8 text-center text-3xl font-semibold text-[#101828DE] lg:mt-1 lg:text-[36px] ">
                Meet the creators
              </h2>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {data &&
            data.map((author, index) => {
              return (
                <div
                  key={index}
                  className="rounded-xl border px-2 py-5 shadow-lg lg:px-16 "
                >
                  <AuthorView author={author} courseSlug={courseSlug} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Authors;

const AuthorView = ({ author, courseSlug }) => {
  const router = useRouter();
  // console.log(router.pathname)
  const formattedText = author.description.split("\n").map((line, index) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parsedLine = line.replace(linkRegex, (match, text, url) => {
      return <a href={url}>{text}</a>;
    });

    return (
      <React.Fragment key={index}>
        {parsedLine}
        <br />
      </React.Fragment>
    );
  });
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    if (author?.name == "Deepak Kumar") {
      setLinkedin("https://www.linkedin.com/in/dipakkr/");
    } else if (author?.name == "Venkatesh Gupta") {
      setLinkedin("https://www.linkedin.com/in/venkateshgupta5/");
    }
  }, []);

  return (
    <div className="mb-4 mt-2 lg:flex">
      <figure className="mb-8 flex max-w-none shrink-0 rounded sm:mb-0 sm:max-w-xs lg:max-w-none">
        <Image
          className="rounded- grow self-center"
          src={author?.image}
          width="200"
          height="200"
          alt={author?.name}
        />
      </figure>
      <div className="sm:ml-4 sm:mt-4 lg:ml-16">
        <div className="flex items-center space-x-2">
          <h4 className="mb-2 text-base font-medium lg:text-lg lg:font-semibold">
            {author?.name}{" "}
          </h4>
          <div>
            <a
              className="text-blue-600 underline"
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} className="pb-1" />
            </a>
          </div>
        </div>
        {router.pathname == "/cohorts/tech-for-product-managers" ? (
          <div>
            <p className="text-md lg:text-md mb-8 text-gray-800">
              Venkatesh is currently working as a Product Manager 2 @ Razorpay.
              He has 5+ years of experience across ed-tech, HR-tech, developer
              tooling, and platform products. He has worn the hat of a technical
              Product Manager and built products at scale, such as the
              reconciliation platform and developer console.
            </p>
            <p className="text-md lg:text-md mb-8 text-gray-800">
              He has also been a 2x ed-tech entrepreneur and has written a
              famous e-book - API for Product Managers.
            </p>
          </div>
        ) : (
          <p className="text-md lg:text-md mb-8 text-gray-800">
            {formattedText}
          </p>
        )}

        {/* {author?.social?.linkedin && (
          <>
            You can reach out to him on{" "}
            <a
              className="text-blue-600 underline"
              href={author?.social?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn{" "}
            </a>
          </>
        )} */}
      </div>
    </div>
  );
};
