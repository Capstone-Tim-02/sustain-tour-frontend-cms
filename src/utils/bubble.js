// export const bubbleRight = {
//   position: 'relative',
//   display: 'inline-block',
//   margin: '20px 0px',
//   maxWidth: '100%',
//   padding: '10px 10px 10px 14px',
//   borderRadius: '12px',
//   WebkitMask: `radial-gradient(30px at 100% 0, #0000 98%, #000 102%) 100%  20px no-repeat,
//       conic-gradient(at 25px 25px, #000 75%, #0000 0) calc(25px / -2) calc(25px / -2) padding-box,
//       radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / 25px 25px space padding-box`,
//   'border-right': '30px solid #0000',
// };

export const bubbleRight = {
  '--r': '25px',
  '--t': '30px',
  '--_d': '100%',
  maxWidth: '90%',
  padding: 'calc(2*var(--r)/3)',
  WebkitMask: `radial-gradient(var(--t) at var(--_d) 0,#0000 98%,#000 102%) 
      var(--_d) 100%/calc(100% - var(--r)) var(--t) no-repeat,
      conic-gradient(at var(--r) var(--r),#000 75%,#0000 0) 
      calc(var(--r)/-2) calc(var(--r)/-2) padding-box, 
      radial-gradient(50% 50%,#000 98%,#0000 101%) 
      0 0/var(--r) var(--r) space padding-box`,
  '--_d': '100%',
  borderRight: 'var(--t) solid #0000',
  marginLeft: 'var(--t)',
  placeSelf: 'end',
};

export const bubbleLeft = {
  '--r': '25px',
  '--t': '30px',
  '--_d': '100%',
  maxWidth: '90%',
  margin: '20px 0px',
  padding: 'calc(2*var(--r)/3)',
  WebkitMask: `radial-gradient(var(--t) at var(--_d) 0,#0000 98%,#000 102%) 
      var(--_d) 100%/calc(100% - var(--r)) var(--t) no-repeat,
      conic-gradient(at var(--r) var(--r),#000 75%,#0000 0) 
      calc(var(--r)/-2) calc(var(--r)/-2) padding-box, 
      radial-gradient(50% 50%,#000 98%,#0000 101%) 
      0 0/var(--r) var(--r) space padding-box`,
  '--_d': '0%',
  borderLeft: 'var(--t) solid #0000',
  marginRight: 'var(--t)',
  placeSelf: 'start',
};
