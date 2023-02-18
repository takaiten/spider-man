import localFont from '@next/font/local';

export const shinGo = localFont({
  src: [
    {
      path: '../../public/assets/fonts//G-OTF Shin Go Pro/G-OTF Shin Go Pro L.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts//G-OTF Shin Go Pro/G-OTF Shin Go Pro R.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts//G-OTF Shin Go Pro/G-OTF Shin Go Pro B.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const steelfish = localFont({
  src: [
    {
      path: '../../public/assets/fonts//Steelfish/steelfish.rg-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts//Steelfish/steelfish.rg-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
