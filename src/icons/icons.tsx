import React, { ReactNode } from "react";

const icons: { [index: string]: ReactNode } = {
  Google: (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      style={{ marginRight: "15px" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 10.7386C21 9.99371 20.9321 9.27727 20.8052 8.59045H10.7144V12.6522H16.4806C16.2314 13.9643 15.4773 15.076 14.3426 15.8209V18.4554H17.8055C19.8325 16.6273 21 13.9358 21 10.7375V10.7386Z"
        fill="#4285F4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7143 21C13.6076 21 16.0321 20.0592 17.8054 18.4554L14.3425 15.8209C13.3834 16.4508 12.1558 16.8232 10.7143 16.8232C7.92292 16.8232 5.56185 14.9769 4.71821 12.495H1.13867V15.2149C2.90183 18.6468 6.52553 21 10.7143 21V21Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.71827 12.495C4.49804 11.8529 4.38478 11.1786 4.38307 10.4994C4.38307 9.80805 4.50424 9.13489 4.71827 8.50388V5.78391H1.13873C0.390455 7.24182 0 8.85871 0 10.4994C0 12.1402 0.390455 13.757 1.13873 15.2149L4.71827 12.495Z"
        fill="#FBBC05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7143 4.17562C12.2872 4.17562 13.6993 4.70527 14.8102 5.74519L17.8836 2.73363C16.0264 1.03992 13.6031 0 10.7143 0C6.52553 0 2.9007 2.35206 1.13867 5.78391L4.71821 8.50388C5.56072 6.02311 7.92292 4.17562 10.7143 4.17562V4.17562Z"
        fill="#EA4335"
      />
    </svg>
  ),
  Github: (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      style={{ marginRight: "15px" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M19.5916 5.3606C18.6526 3.71151 17.3789 2.40592 15.7703 1.44353C14.1615 0.481094 12.4051 0 10.4999 0C8.59497 0 6.83801 0.481241 5.22949 1.44353C3.62072 2.40587 2.34716 3.71151 1.40822 5.3606C0.469422 7.00966 0 8.81045 0 10.7629C0 13.1082 0.667525 15.2173 2.0029 17.0905C3.33815 18.9638 5.06307 20.26 7.17756 20.9794C7.4237 21.0262 7.6059 20.9933 7.72436 20.8813C7.84288 20.7694 7.90206 20.6291 7.90206 20.4611C7.90206 20.4331 7.89973 20.1809 7.89517 19.7043C7.89047 19.2277 7.88828 18.8121 7.88828 18.4573L7.57381 18.5131C7.37331 18.5506 7.12038 18.5666 6.81501 18.5622C6.50979 18.5577 6.19294 18.5249 5.86488 18.464C5.53666 18.4036 5.2314 18.2634 4.94882 18.0439C4.6664 17.8243 4.4659 17.5368 4.34738 17.1821L4.21067 16.8596C4.11954 16.6449 3.97607 16.4064 3.78008 16.1449C3.58408 15.8832 3.38588 15.7059 3.1854 15.6124L3.08966 15.5422C3.02589 15.4955 2.9667 15.4392 2.91197 15.374C2.85729 15.3086 2.81634 15.2432 2.789 15.1778C2.76161 15.1121 2.7843 15.0584 2.85733 15.0163C2.93035 14.974 3.06233 14.9536 3.25382 14.9536L3.52715 14.9954C3.70945 15.033 3.93494 15.1448 4.20391 15.3318C4.47275 15.5186 4.69374 15.7615 4.86693 16.0603C5.07668 16.4435 5.32937 16.7354 5.62573 16.9364C5.92186 17.1373 6.22042 17.2376 6.52114 17.2376C6.82186 17.2376 7.08159 17.2142 7.30044 17.1678C7.51904 17.121 7.72413 17.0507 7.91562 16.9574C7.99765 16.3312 8.22099 15.85 8.58544 15.5138C8.06598 15.4578 7.59895 15.3736 7.18411 15.2615C6.76952 15.1493 6.34109 14.9671 5.89911 14.7146C5.45689 14.4624 5.09003 14.1494 4.79846 13.7759C4.50684 13.4021 4.26752 12.9114 4.0808 12.3043C3.894 11.6969 3.80058 10.9962 3.80058 10.2021C3.80058 9.07138 4.16068 8.10919 4.88073 7.31498C4.54343 6.4649 4.57527 5.51195 4.97636 4.4562C5.24068 4.37202 5.63267 4.43519 6.15213 4.64533C6.6717 4.85557 7.0521 5.03566 7.29373 5.18498C7.53536 5.33425 7.72896 5.46075 7.87482 5.56333C8.72264 5.32051 9.59755 5.19906 10.4998 5.19906C11.4021 5.19906 12.2772 5.32051 13.125 5.56333L13.6445 5.22715C13.9998 5.00282 14.4194 4.79725 14.9021 4.61038C15.3851 4.4236 15.7546 4.37216 16.0099 4.45634C16.4199 5.51215 16.4564 6.46505 16.1191 7.31513C16.839 8.10935 17.1993 9.07178 17.1993 10.2022C17.1993 10.9963 17.1056 11.6992 16.919 12.3113C16.7323 12.9234 16.4909 13.4136 16.1947 13.7828C15.8983 14.152 15.5291 14.4627 15.0871 14.7148C14.645 14.9671 14.2165 15.1491 13.8019 15.2614C13.3871 15.3736 12.92 15.458 12.4006 15.514C12.8744 15.9343 13.1113 16.5976 13.1113 17.5039V20.4607C13.1113 20.6287 13.1683 20.7689 13.2824 20.881C13.3963 20.9929 13.5761 21.0259 13.8223 20.9789C15.937 20.2596 17.6621 18.9634 18.9971 17.0901C20.3322 15.2169 21 13.1078 21 10.7625C20.9995 8.81029 20.5299 7.00966 19.5916 5.3606Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="21" height="21" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  Static: (
    <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m12 17.56l4.07-1.13.55-6.1h-7.24l-.18-2.03h7.6l.2-1.99h-10l.56 6.01h6.89l-.23 2.58-2.22.6-2.22-.6-.14-1.66h-2l.29 3.19 4.07 1.13m-7.93-14.56h15.86l-1.43 16.2-6.5 1.8-6.5-1.8-1.43-16.2z"
        fill="#e44d26"
      />
    </svg>
  ),
  C: (
    <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m16.45 15.97.42 2.44c-.26.14-.68.27-1.24.39-.57.13-1.24.2-2.01.2-2.21-.04-3.87-.7-4.98-1.96-1.14-1.27-1.68-2.88-1.68-4.83.04-2.31.72-4.08 2.04-5.32 1.28-1.25 2.92-1.89 4.9-1.89.75 0 1.4.07 1.94.19s.94.25 1.2.4l-.6 2.49-1.04-.34c-.4-.1-.87-.15-1.4-.15-1.15-.01-2.11.36-2.86 1.1-.76.73-1.14 1.85-1.18 3.34.01 1.36.37 2.42 1.08 3.2.71.77 1.7 1.17 2.99 1.18l1.33-.12c.43-.08.79-.19 1.09-.32z"
        style={{ fill: "#0277bd" }}
      />
    </svg>
  ),
  CPP: (
    <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m10 15.97.41 2.44c-.26.14-.68.27-1.24.39-.57.13-1.24.2-2.01.2-2.21-.04-3.87-.7-4.98-1.96-1.12-1.27-1.68-2.88-1.68-4.83.05-2.31.72-4.08 2-5.32 1.32-1.25 2.96-1.89 4.94-1.89.75 0 1.4.07 1.94.19s.94.25 1.2.4l-.58 2.49-1.06-.34c-.4-.1-.86-.15-1.39-.15-1.16-.01-2.12.36-2.87 1.1-.76.73-1.15 1.85-1.18 3.34 0 1.36.37 2.42 1.08 3.2.71.77 1.71 1.17 2.99 1.18l1.33-.12c.43-.08.79-.19 1.1-.32m.5-4.97h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2m7 0h2v-2h2v2h2v2h-2v2h-2v-2h-2z"
        style={{ fill: "#0277bd" }}
      />
    </svg>
  ),
};
export default icons;
