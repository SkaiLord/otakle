import Link from 'next/link';
import React from 'react';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';

export default function Footer() {
  const socials = [
    {
      Label: 'LinkedIn',
      Link: 'https://www.linkedin.com/in/sahirkhan007',
      Icon: SiLinkedin,
    },
    {
      Label: 'GitHub',
      Link: 'https://github.com/SkaiLord',
      Icon: SiGithub,
    },
    {
      Label: 'Twitter',
      Link: 'https://x.com/SkaiLord007',
      Icon: SiTwitter,
    },
  ];

  return (
    <footer className="border-t mt-10 flex flex-col justify-center items-center gap-5 py-10">
      <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">
        SkaiLord 👨🏻‍💼
      </h1>
      <div className="flex items-center gap-5">
        {socials.map((social, index) => {
          return (
            <Link href={social.Link} key={index} aria-label={social.Label}>
              <social.Icon className="w-5 h-5 hover:scale-125 transition-all" />
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
