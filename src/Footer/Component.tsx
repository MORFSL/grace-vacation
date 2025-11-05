import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Contact, Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Socials } from '@/socials/Component'
import { Media } from '@/components/Media'
import { PhoneOutgoing } from 'lucide-react'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 2)()
  const contacts: Contact = await getCachedGlobal('contacts', 2)()
  const navItems = footer?.navItems || []

  if (!navItems.length) {
    return <Author />
  }

  return (
    <footer className="relative mt-auto">
      <div className="rounded-lg px-16 py-8 mx-auto container bg-muted">
        <Overlay />
        <div className="py-10 flex flex-col lg:flex-row w-full justify-between gap-12 lg:gap-4">
          {footer.phoneLabel && (
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <PhoneOutgoing />
              <span className="flex flex-col lg:flex-row items-center gap-2">
                <span className="font-medium">{footer.phoneLabel}</span>
                <Link
                  className="flex items-center text-primary font-medium"
                  href={'tel:' + contacts?.phone}
                >
                  {contacts?.phone}
                </Link>
              </span>
            </div>
          )}
          {footer.socialsLabel && (
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <span className="font-medium">{footer.socialsLabel}</span>
              <Socials size={24} className="gap-4" />
            </div>
          )}
        </div>
        <nav className="border-t-2 border-primary-foreground pt-10 flex flex-col lg:flex-row w-full justify-between gap-12 lg:gap-4 text-center lg:text-start">
          {contacts.address || contacts.email ? (
            <div>
              <div className="text-lg font-medium">Contacts</div>
              <div className="mt-5 flex flex-col gap-3">
                {contacts.address && <div className="whitespace-pre-wrap">{contacts.address}</div>}
                {contacts.email && <Link href={`mailto:${contacts.email}`}>{contacts.email}</Link>}
              </div>
            </div>
          ) : null}
          {navItems.map(({ item }, idx) => {
            return (
              <div key={idx}>
                <div className="text-lg font-medium">{item?.name}</div>
                <div className="mt-5 flex flex-col gap-3">
                  {item?.links?.map(({ link }, idx) => {
                    return <CMSLink key={idx} {...link} />
                  })}
                </div>
              </div>
            )
          })}
        </nav>
        {footer.paymentMethods && (
          <div className="mt-10 lg:mt-8 flex flex-col lg:flex-row items-center gap-4">
            <div className="font-medium text-sm">{footer.paymentMethods.label}</div>
            <div className="flex items-center gap-3">
              {footer.paymentMethods.method?.map((method) => {
                return (
                  <div key={method.id} className="relative border rounded w-10 h-8 bg-white">
                    <Media
                      key={method?.id}
                      resource={method?.image}
                      imgClassName="object-contain mx-auto max-w-[80%]"
                      fill
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <Author copyright={footer?.copyright} />
    </footer>
  )
}

const Author = ({ copyright = 'All rights reserved [year]' }: { copyright?: string | null }) => (
  <small className="px-4 py-4 mx-auto container flex flex-col lg:flex-row gap-4 justify-between text-sm text-center lg:text-start">
    {copyright && <p>{copyright.replace('[year]', new Date().getFullYear().toString())}</p>}
    <p>Designed by morf</p>
  </small>
)

const Overlay = () => (
  <svg
    width="100%"
    height="48"
    viewBox="0 0 1400 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -top-[16px] 2xl:top-0 left-0 w-full"
  >
    <path
      d="M0 16.77C0 16.77 36.0493 24.204 69.1358 24.7227C102.716 25.2413 131.358 24.7227 172.345 22.1295C228.148 18.6717 335.802 4.66792 393.087 12.2749C450.371 19.8819 452.839 20.2276 481.976 25.0685C514.568 30.6008 580.741 41.6655 662.716 41.1469C750.123 40.6282 908.639 12.4478 973.825 13.8308C980.739 14.0038 1006.42 15.2139 1025.68 17.2886C1044.45 19.3633 1072.1 23.8582 1109.63 25.4143C1125.43 26.1058 1150.62 27.316 1179.76 26.9702C1187.16 26.7974 1210.87 26.2787 1239.02 24.204C1267.16 22.1295 1293.34 18.8445 1317.03 17.8073C1367.9 15.9055 1400 18.6717 1400 18.6717V0H0V16.77ZM112.099 19.5361C115.556 17.8073 121.975 18.8445 133.334 18.8445C144.692 18.8445 163.457 16.77 161.975 16.9428C160.494 17.1158 146.666 19.5361 132.346 20.2276C117.531 21.0921 109.136 21.265 112.099 19.5361ZM202.963 14.8682C202.963 14.8682 214.814 14.5224 230.617 13.3122C246.419 11.9291 281.482 8.47142 305.185 7.26121C345.679 5.35947 383.21 7.26121 379.753 7.4341C375.803 7.60699 332.346 6.39678 292.84 9.33585C276.544 10.5461 246.913 13.1394 231.605 14.0038C215.308 15.0411 202.963 14.8682 202.963 14.8682ZM485.432 14.6953C477.037 13.4852 551.111 22.821 576.79 25.2413C587.161 26.2787 607.407 28.0076 626.173 28.6991C645.432 29.3907 670.123 29.3907 669.629 29.5635C669.629 29.9093 640.988 30.9466 614.321 29.5635C587.655 28.1804 588.642 27.6618 576.79 26.7974C558.024 25.4143 493.827 15.9055 485.432 14.6953ZM416.79 11.9291C415.802 11.9291 420.74 11.2376 440.494 13.8308C460.247 16.4242 473.58 19.8819 474.568 20.2276C475.556 20.4006 457.284 17.1158 441.975 15.0411C427.16 12.9664 417.284 11.9291 416.79 11.9291ZM2.4691 10.3732C2.96291 10.5461 11.8518 12.2749 26.1727 14.6953C40.4938 17.1158 60.2469 19.5361 59.2592 19.3633C58.2717 19.3633 41.9753 18.3259 22.7161 15.0411C3.4568 11.7563 1.9753 10.2003 2.4691 10.3732ZM1245.43 20.0548C1244.93 19.709 1254.81 19.709 1267.65 17.9801C1280.49 16.2513 1294.32 15.2139 1306.18 14.5224C1325.92 13.1394 1363.95 14.6953 1361.97 14.8682C1360.5 15.0411 1321.48 14.3496 1300.25 16.0784C1289.38 16.9428 1288.4 16.9428 1272.1 18.8445C1255.8 20.7464 1245.92 20.5734 1245.43 20.0548ZM1039.51 15.9055C1037.53 15.7327 1022.23 13.1394 998.021 11.4105C973.825 9.50874 954.077 10.5461 954.077 10.0274C954.077 9.50874 959.016 8.47142 984.69 9.50874C1010.37 10.5461 1041.48 16.0784 1039.51 15.9055ZM1046.42 11.5834C1045.43 11.7563 1029.63 9.33585 1018.27 8.64431C1006.91 8.12564 1008.89 7.77988 1008.89 7.60699C1008.89 7.4341 1014.32 7.26121 1022.23 7.95276C1030.62 8.8172 1047.41 11.4105 1046.42 11.5834ZM937.774 7.60699C937.284 7.95276 920.492 8.99007 910.125 10.7189C899.757 12.4478 901.234 11.7563 900.744 11.5834C900.247 11.4105 904.688 10.2003 912.59 9.33585C920.492 8.29853 938.272 7.26121 937.774 7.60699ZM1077.04 19.1903C1077.53 19.709 1075.56 20.0548 1067.66 18.8445C1059.75 17.6344 1054.81 16.597 1056.79 16.77C1058.77 16.9428 1061.23 17.4615 1069.13 18.1531C1077.53 18.8445 1076.55 18.6717 1077.04 19.1903ZM1229.63 21.4379C1230.62 21.4379 1219.26 22.821 1213.33 22.9938C1207.41 23.1668 1203.46 23.1668 1203.46 22.6481C1203.46 22.1295 1203.95 21.7837 1211.36 21.9565C1219.26 22.1295 1228.64 21.4379 1229.63 21.4379ZM648.395 36.479C648.889 36.6519 660.247 35.9603 685.432 35.9603C710.124 35.9603 752.593 31.8111 770.37 29.9093C788.146 28.0075 720.988 36.6518 688.889 36.9976C656.79 37.3434 647.901 36.3061 648.395 36.479Z"
      fill="white"
    />
    <path
      d="M68.6416 31.1197C69.1355 30.9468 91.3575 31.6383 104.197 31.1197C140.246 29.9094 188.148 25.5873 186.173 26.106C184.197 26.6246 118.518 31.4655 102.222 31.8113C78.0241 32.5028 68.1478 31.1197 68.6416 31.1197Z"
      fill="white"
    />
    <path
      d="M277.037 16.9425C278.024 16.7697 299.259 15.2136 323.951 14.8678C348.642 14.5221 386.667 15.9052 384.691 15.7322C383.21 15.5594 355.556 12.6203 319.013 13.6577C282.469 14.695 276.05 17.1153 277.037 16.9425Z"
      fill="white"
    />
    <path
      d="M390.123 23.1663C390.617 22.9933 380.247 21.4374 374.321 21.2646C368.395 21.0916 364.444 21.2646 364.444 21.7832C364.444 22.3019 364.938 22.6477 372.345 22.4747C380.741 22.3019 389.629 23.3391 390.123 23.1663Z"
      fill="white"
    />
    <path
      d="M407.408 18.3258C407.408 18.1529 429.136 20.4004 438.519 22.1293C447.901 23.6852 469.136 27.4888 468.642 27.4888C468.148 27.6616 447.901 24.7226 437.531 22.9937C427.16 21.2648 407.408 18.4987 407.408 18.3258Z"
      fill="white"
    />
    <path
      d="M637.037 46.1602C637.53 45.9874 659.753 46.6788 672.592 46.1602C708.642 44.95 756.543 40.6279 754.568 41.1465C752.592 41.6651 686.914 46.506 670.617 46.8518C646.419 47.5433 636.543 46.333 637.037 46.1602Z"
      fill="white"
    />
    <path
      d="M1193.09 33.3669C1193.09 33.3669 1187.16 32.8483 1178.77 33.1941C1170.37 33.5399 1150.12 34.75 1138.27 34.4043C1117.53 33.7127 1101.73 29.7363 1103.71 29.9093C1105.68 29.9093 1124.94 33.7127 1146.17 33.1941C1155.06 33.0213 1171.36 32.3297 1179.26 32.5025C1187.16 32.6755 1193.09 33.3669 1193.09 33.3669Z"
      fill="white"
    />
    <path
      d="M1027.16 21.7837C1026.18 21.9565 1017.29 20.4006 1005.92 19.8818C994.568 19.5362 995.556 19.3632 995.556 19.0175C995.556 18.8445 1004.45 18.3259 1012.35 19.0175C1020.25 19.8818 1028.14 21.6107 1027.16 21.7837Z"
      fill="white"
    />
    <path
      d="M1322.96 22.821C1322.96 22.6481 1301.73 22.821 1289.87 23.6854C1278.02 24.5499 1265.19 26.9702 1265.19 27.1432C1265.19 27.316 1278.52 25.7601 1290.37 24.7227C1301.73 23.6854 1322.47 22.9939 1322.96 22.821Z"
      fill="white"
    />
  </svg>
)
