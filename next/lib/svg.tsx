function PrimaryLinearGradient() {
  return (
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#38D0FF" }} />
        <stop offset="100%" style={{ stopColor: "#0D57EF" }} />
      </linearGradient>
    </defs>
  );
}

export function IconHome({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M739.253,436.59c-.261-.027-.49-.034-.712-.077a2.02,2.02,0,0,1-1.145-3.327c.09-.1.19-.2.287-.3,2.884-2.884,5.788-5.748,8.639-8.664a2.247,2.247,0,0,1,3.18-.015q4.341,4.431,8.771,8.776a2.139,2.139,0,0,1-.06,3.112,2.4,2.4,0,0,1-1.629.468v.419q0,3,0,6a2.375,2.375,0,0,1-2.574,2.574q-1.585,0-3.171,0c-.566,0-.8-.229-.8-.793,0-1.62,0-3.24,0-4.859a1.1,1.1,0,0,0-1.264-1.266c-.609,0-1.218,0-1.827,0a1.071,1.071,0,0,0-1.143,1.144c-.005,1.643,0,3.286,0,4.928,0,.632-.215.845-.85.845-1.068,0-2.137,0-3.205,0a2.364,2.364,0,0,1-2.49-2.488c-.005-2.033,0-4.067,0-6.1Zm5.249,7.65v-.386c0-1.356-.006-2.712,0-4.068a2.378,2.378,0,0,1,2.438-2.447c.632-.008,1.264,0,1.9,0a2.377,2.377,0,0,1,2.495,2.491c.006,1.344,0,2.689,0,4.033v.409h2.545c1.046,0,1.419-.368,1.419-1.4q0-3.413,0-6.826c0-.546.235-.775.776-.781a3.8,3.8,0,0,0,.892-.02,1.218,1.218,0,0,0,.611-.423.6.6,0,0,0-.074-.738,2.317,2.317,0,0,0-.235-.252l-8.653-8.654c-.53-.53-.861-.528-1.4.006l-8.654,8.653-.146.147a.738.738,0,0,0,.523,1.279c.23,0,.46,0,.689,0,.72,0,.917.2.917.925q0,3.447,0,6.895a1.083,1.083,0,0,0,1.173,1.187c.839.009,1.678,0,2.517,0A2.475,2.475,0,0,0,744.5,444.24Z"
        transform="translate(-736.888 -423.557)"
      />
    </svg>
  );
}

export function IconOrder({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M541.277,409.564a1.136,1.136,0,0,1,.482-1.084,1.6,1.6,0,0,1,.743-.2c2.474-.014,4.947-.009,7.421-.008a1.1,1.1,0,0,1,1.258,1.165.8.8,0,0,0,.037.128c.325,0,.654,0,.984,0a2.342,2.342,0,0,1,2.4,2.384q.005,7.936-.017,15.872a2.352,2.352,0,0,1-2.485,2.447q-5.892,0-11.784,0a2.361,2.361,0,0,1-2.472-2.46q0-7.867.016-15.735a2.366,2.366,0,0,1,2.527-2.509C540.672,409.563,540.957,409.564,541.277,409.564Zm-.017,1.288c-.286,0-.569,0-.852,0a1.105,1.105,0,0,0-1.255,1.271q-.007,7.8-.011,15.6c0,.861.392,1.25,1.264,1.25h11.58c.936,0,1.312-.375,1.313-1.31q.007-5.429.012-10.858,0-2.405,0-4.811a1,1,0,0,0-.762-1.084,9.069,9.069,0,0,0-1.351-.014c-.076.81-.423,1.23-1.07,1.233q-3.9.014-7.8,0a1.019,1.019,0,0,1-1-.834C541.3,411.163,541.286,411.028,541.26,410.852Zm1.336-.029h7.258V409.6H542.6Z"
        transform="translate(-537.845 -408.271)"
      />
      <path
        d="M577.911,483.714c-.721,0-1.443,0-2.164,0-.472,0-.762-.257-.757-.653a.66.66,0,0,1,.74-.64q2.2-.006,4.4,0a.653.653,0,0,1,.737.641c0,.4-.278.65-.754.653C579.377,483.716,578.644,483.714,577.911,483.714Z"
        transform="translate(-567.03 -466.527)"
      />
      <path
        d="M577.91,443.62c-.721,0-1.443,0-2.164,0-.47,0-.764-.255-.765-.647s.3-.646.767-.647q2.164,0,4.328,0c.471,0,.765.259.764.651s-.291.641-.767.643C579.353,443.622,578.631,443.62,577.91,443.62Z"
        transform="translate(-567.023 -435.025)"
      />
      <path
        d="M577.922,462.431c.732,0,1.464,0,2.2,0,.45,0,.732.254.73.639a.65.65,0,0,1-.734.641q-2.2.008-4.394,0a.647.647,0,0,1-.73-.645c0-.387.281-.633.734-.636C576.457,462.428,577.19,462.431,577.922,462.431Z"
        transform="translate(-567.031 -450.824)"
      />
      <path
        d="M552.92,459.608c.505-.509.953-.964,1.406-1.415a.656.656,0,1,1,.913.909q-.869.875-1.745,1.745a.673.673,0,0,1-1.1.01c-.237-.231-.474-.463-.7-.7a.648.648,0,0,1-.018-.923.631.631,0,0,1,.92.008A4.7,4.7,0,0,1,552.92,459.608Z"
        transform="translate(-548.569 -447.272)"
      />
      <path
        d="M552.925,479.626c.5-.5.946-.962,1.4-1.415.346-.345.711-.38,1-.107s.255.674-.092,1.023q-.86.866-1.725,1.726a.675.675,0,0,1-1.123.014c-.229-.224-.459-.448-.679-.681a.644.644,0,1,1,.911-.907C552.715,479.371,552.8,479.482,552.925,479.626Z"
        transform="translate(-548.567 -462.997)"
      />
      <path
        d="M552.91,438c.538-.539,1.018-1.027,1.505-1.507a.617.617,0,0,1,.786-.116.589.589,0,0,1,.3.7.787.787,0,0,1-.2.347q-.913.932-1.843,1.847a.651.651,0,0,1-1.024,0c-.247-.238-.493-.478-.728-.728a.651.651,0,0,1-.023-.925.642.642,0,0,1,.923.009A3.443,3.443,0,0,1,552.91,438Z"
        transform="translate(-548.575 -430.282)"
      />
    </svg>
  );
}

export function IconPosition({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M568.713,578.511c-.61-.958-1.209-1.865-1.773-2.793a21.979,21.979,0,0,1-1.857-3.821,6.962,6.962,0,0,1,4.744-8.939,7.09,7.09,0,0,1,9.033,7,7.528,7.528,0,0,1-.658,2.652,28.785,28.785,0,0,1-2.9,5.173c-.153.227-.307.452-.49.723.173.046.31.084.448.118a7.632,7.632,0,0,1,2.406.975,2.317,2.317,0,0,1,1.171,1.578,2.026,2.026,0,0,1-.953,2,6.552,6.552,0,0,1-2.443,1.052,14.67,14.67,0,0,1-8.292-.3,5.786,5.786,0,0,1-1.433-.724,1.977,1.977,0,0,1-.027-3.47,7.236,7.236,0,0,1,2.537-1.1C568.383,578.594,568.536,578.557,568.713,578.511Zm2.969,1.917.152-.03c.7-.972,1.429-1.931,2.11-2.921a26.093,26.093,0,0,0,3.138-5.584,6.077,6.077,0,0,0,.464-2.092,5.757,5.757,0,1,0-11.161,1.913,21.488,21.488,0,0,0,2.031,3.927C569.477,577.255,570.591,578.834,571.682,580.428Zm.4,2.963c.407-.038,1.105-.076,1.795-.174a8.359,8.359,0,0,0,2.944-.875q1.494-.832.037-1.731a7.048,7.048,0,0,0-2.719-.891.444.444,0,0,0-.32.174c-.465.58-.91,1.176-1.371,1.76-.481.61-.849.6-1.341-.013-.278-.349-.549-.7-.828-1.052-.241-.3-.439-.747-.747-.847a2.37,2.37,0,0,0-1.162.194,4.917,4.917,0,0,0-2.034.949.674.674,0,0,0,.03,1.2,3.715,3.715,0,0,0,.829.475A13.06,13.06,0,0,0,572.078,583.391Z"
        transform="translate(-564.679 -562.679)"
      />
      <path
        d="M581.225,583.757a4.529,4.529,0,1,1,4.536-4.509A4.517,4.517,0,0,1,581.225,583.757Zm-3.2-4.528a3.225,3.225,0,1,0,3.23-3.247A3.243,3.243,0,0,0,578.021,579.23Z"
        transform="translate(-574.147 -572.123)"
      />
    </svg>
  );
}

export function IconMenu({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M185.013,322.3c.353,0,.66,0,.968,0a1.506,1.506,0,0,1,1.6,1.592q.006,7.376,0,14.753a1.5,1.5,0,0,1-1.593,1.594q-6.465,0-12.93,0a1.5,1.5,0,0,1-1.6-1.592q0-7.686,0-15.372a1.493,1.493,0,0,1,1.128-1.537q5.106-1.685,10.211-3.369a1.54,1.54,0,0,1,2.211,1.611C185.013,320.733,185.013,321.488,185.013,322.3Zm-12.258,8.974h0q0,3.611,0,7.221c0,.431.017.447.444.447h12.655c.421,0,.439-.019.44-.452q0-7.187,0-14.374c0-.515-.008-.522-.514-.522l-12.552,0c-.449,0-.472.022-.472.456Q172.754,327.661,172.754,331.271Zm10.961-8.989c0-.787,0-1.54,0-2.293,0-.5-.062-.543-.543-.385l-7.137,2.354c-.264.087-.526.182-.789.273l.014.051Z"
        transform="translate(-171.46 -318.239)"
      />
      <path
        d="M190.917,357h-4.025a2.43,2.43,0,0,1-.343-.013.65.65,0,0,1-.575-.628.624.624,0,0,1,.559-.635c.212-.019.281-.094.332-.294a4.114,4.114,0,0,1,3.1-3.127c.224-.061.326-.119.323-.373a.631.631,0,0,1,.64-.663.642.642,0,0,1,.627.679c0,.2.048.292.266.348A4.133,4.133,0,0,1,195,355.474a.4.4,0,0,0,.254.231.683.683,0,0,1,.617.666.65.65,0,0,1-.687.626c-.837.012-1.674.006-2.511.007h-1.755Zm2.748-1.31a2.775,2.775,0,0,0-2.8-2.206c-1.333.041-2.672,1.141-2.676,2.206Z"
        transform="translate(-182.86 -344.184)"
      />
      <path
        d="M191.526,399.393q-1.994,0-3.988,0c-.484,0-.771-.241-.777-.633s.294-.66.791-.66q3.988,0,7.975,0c.322,0,.632.074.724.4a.656.656,0,0,1-.7.89c-1.34.02-2.681.01-4.022.01Z"
        transform="translate(-183.479 -380.966)"
      />
      <path
        d="M189.374,386.112c.492,0,.984,0,1.476,0a.649.649,0,1,1,0,1.291q-1.476.011-2.952,0a.648.648,0,1,1,0-1.29C188.389,386.107,188.881,386.111,189.374,386.112Z"
        transform="translate(-183.812 -371.55)"
      />
    </svg>
  );
}

export function IconSelection({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path d="M 12 24 C 5.382812 24 0 18.617188 0 12 C 0 5.382812 5.382812 0 12 0 C 18.617188 0 24 5.382812 24 12 C 24 18.617188 18.617188 24 12 24 Z M 12 1.5 C 6.210938 1.5 1.5 6.210938 1.5 12 C 1.5 17.789062 6.210938 22.5 12 22.5 C 17.789062 22.5 22.5 17.789062 22.5 12 C 22.5 6.210938 17.789062 1.5 12 1.5 Z M 12 1.5 " />
      <path d="M 17.25 12.75 L 6.75 12.75 C 6.335938 12.75 6 12.414062 6 12 C 6 11.585938 6.335938 11.25 6.75 11.25 L 17.25 11.25 C 17.664062 11.25 18 11.585938 18 12 C 18 12.414062 17.664062 12.75 17.25 12.75 Z M 17.25 12.75 " />
      <path d="M 12 18 C 11.585938 18 11.25 17.664062 11.25 17.25 L 11.25 6.75 C 11.25 6.335938 11.585938 6 12 6 C 12.414062 6 12.75 6.335938 12.75 6.75 L 12.75 17.25 C 12.75 17.664062 12.414062 18 12 18 Z M 12 18 " />
    </svg>
  );
}

export function IconDiscount({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M577.39,150.392a7.256,7.256,0,0,1-.261.81c-.193.452-.412.895-.649,1.325a.985.985,0,0,0,.008,1.037c.237.43.443.879.653,1.323a1.925,1.925,0,0,1-.881,2.707c-.461.253-.924.506-1.4.738a.886.886,0,0,0-.515.716c-.084.543-.173,1.085-.284,1.623a1.887,1.887,0,0,1-2.2,1.6c-.546-.062-1.09-.14-1.632-.226a.911.911,0,0,0-.867.287c-.356.372-.734.723-1.109,1.077a1.918,1.918,0,0,1-2.845,0c-.374-.354-.752-.706-1.108-1.078a.909.909,0,0,0-.866-.287c-.542.087-1.087.159-1.632.228a1.889,1.889,0,0,1-2.189-1.562c-.112-.538-.2-1.08-.284-1.623a.928.928,0,0,0-.55-.767c-.474-.228-.936-.483-1.4-.739a1.915,1.915,0,0,1-.866-2.659c.212-.456.422-.916.667-1.355a1,1,0,0,0-.008-1.067c-.233-.42-.431-.859-.638-1.293a1.933,1.933,0,0,1,.888-2.732c.452-.247.9-.5,1.366-.722a.906.906,0,0,0,.533-.741c.081-.531.17-1.062.277-1.589a1.891,1.891,0,0,1,2.216-1.611c.534.061,1.067.137,1.6.223a.933.933,0,0,0,.9-.3c.347-.365.718-.707,1.083-1.054a1.924,1.924,0,0,1,2.871,0c.374.355.751.707,1.109,1.077a.888.888,0,0,0,.837.278c.565-.087,1.132-.171,1.7-.233a1.876,1.876,0,0,1,2.127,1.516c.125.558.211,1.125.3,1.69a.908.908,0,0,0,.533.741c.483.236.954.5,1.427.754A2,2,0,0,1,577.39,150.392Zm-15.752-5.332a.655.655,0,0,0-.777.572c-.1.54-.2,1.08-.284,1.623a2.032,2.032,0,0,1-1.152,1.6c-.481.241-.953.5-1.426.755a.658.658,0,0,0-.329,1q.36.76.737,1.512a1.95,1.95,0,0,1,0,1.846c-.247.491-.485.985-.722,1.481a.666.666,0,0,0,.328,1.024c.513.278,1.032.545,1.544.825a1.852,1.852,0,0,1,.98,1.337c.107.574.206,1.149.312,1.722.1.544.334.718.888.65.522-.064,1.045-.133,1.564-.221a2.019,2.019,0,0,1,1.849.594q.564.553,1.135,1.1a.692.692,0,0,0,1.128-.01c.4-.381.788-.766,1.185-1.146a1.944,1.944,0,0,1,1.732-.545c.565.089,1.132.172,1.7.236a.64.64,0,0,0,.8-.6c.1-.529.195-1.058.278-1.589a2.033,2.033,0,0,1,1.153-1.6c.481-.241.953-.5,1.426-.755a.658.658,0,0,0,.327-1c-.231-.486-.464-.971-.709-1.449a2.005,2.005,0,0,1-.009-1.941c.246-.478.477-.964.708-1.449a.666.666,0,0,0-.329-1.023c-.493-.267-.991-.525-1.485-.789a1.915,1.915,0,0,1-1.047-1.407c-.1-.563-.2-1.127-.3-1.689-.1-.542-.334-.717-.889-.648-.534.066-1.067.139-1.6.226a1.968,1.968,0,0,1-1.788-.574q-.589-.577-1.185-1.147a.679.679,0,0,0-1.079.008c-.406.388-.8.782-1.21,1.17a1.944,1.944,0,0,1-1.732.546C562.766,145.21,562.175,145.135,561.638,145.06Z"
        transform="translate(-556.294 -142.039)"
      />
      <path
        d="M583.841,180.613c-.193-.147-.429-.24-.5-.4a1.1,1.1,0,0,1,.006-.642c.026-.116.169-.209.266-.306l7.988-7.99c.04-.04.08-.082.122-.121a.649.649,0,0,1,.97-.058.638.638,0,0,1-.065.944q-4.125,4.131-8.259,8.253A2.891,2.891,0,0,1,583.841,180.613Z"
        transform="translate(-577.507 -164.716)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M587.451,169.066a2.327,2.327,0,1,1-2.315-2.327A2.343,2.343,0,0,1,587.451,169.066Zm-3.375.012a1.048,1.048,0,1,0,1.026-1.064A1.047,1.047,0,0,0,584.076,169.078Z"
        transform="translate(-577.117 -161.447)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M608.806,202.955a2.324,2.324,0,1,1,2.333-2.309A2.339,2.339,0,0,1,608.806,202.955Zm1.054-2.333a1.048,1.048,0,1,0-1.03,1.06A1.043,1.043,0,0,0,609.86,200.622Z"
        transform="translate(-595.729 -186.249)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
    </svg>
  );
}

export function IconCustomer({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M123.437,643.976q-4.412,0-8.823,0a1.958,1.958,0,0,1-2.078-1.486,2.2,2.2,0,0,1-.061-.509c0-1.144-.015-2.289,0-3.433a3.174,3.174,0,0,1,3.087-3.149c.992-.026,1.986.046,2.98.06a.365.365,0,0,0,.255-.158,3.124,3.124,0,0,1,2.7-1.557c1.35-.02,2.7-.026,4.05.011a2.992,2.992,0,0,1,2.525,1.483c.125.195.238.211.463.206a21.253,21.253,0,0,1,3.352.038,3.075,3.075,0,0,1,2.561,3.087c.013,1.064,0,2.128,0,3.193a1.988,1.988,0,0,1-2.231,2.215Zm-3.807-1.314H127.3v-.356q0-2.576,0-5.151a1.965,1.965,0,0,0-2.134-2.14q-1.7-.005-3.4,0a1.965,1.965,0,0,0-2.134,2.141q0,2.576,0,5.151Zm-1.308-5.924a2.127,2.127,0,0,0-.34-.059c-.789-.005-1.582-.049-2.367.007a1.883,1.883,0,0,0-1.845,2.023c-.006,1.053,0,2.106,0,3.159,0,.606.215.815.835.816q1.631,0,3.262,0h.457Zm10.266,5.941c1.365,0,2.679.009,3.992-.006a.585.585,0,0,0,.575-.613c.006-1.213.022-2.427-.014-3.639a1.794,1.794,0,0,0-1.569-1.7c-.887-.068-1.782-.029-2.674-.038-.246,0-.32.1-.318.354.013,1.751.007,3.5.007,5.253Z"
        transform="translate(-112.469 -625.742)"
      />
      <path
        d="M149.768,596.443a3.826,3.826,0,1,1-3.82,3.831A3.847,3.847,0,0,1,149.768,596.443Zm.022,1.291a2.534,2.534,0,1,0,2.52,2.549A2.546,2.546,0,0,0,149.789,597.734Z"
        transform="translate(-138.778 -596.443)"
      />
      <path
        d="M124.921,615.917a2.858,2.858,0,1,1-2.849-2.87A2.853,2.853,0,0,1,124.921,615.917Zm-1.292-.011a1.565,1.565,0,1,0-1.571,1.574A1.566,1.566,0,0,0,123.629,615.905Z"
        transform="translate(-117.762 -609.491)"
      />
      <path
        d="M184.58,618.764a2.858,2.858,0,1,1,2.869-2.846A2.852,2.852,0,0,1,184.58,618.764Zm1.575-2.859a1.565,1.565,0,1,0-1.57,1.575A1.564,1.564,0,0,0,186.155,615.9Z"
        transform="translate(-166.9 -609.491)"
      />
    </svg>
  );
}

export function IconReport({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      {hasGradient && <PrimaryLinearGradient />}
      <path
        d="M343.591,748.772q0,4.108,0,8.215a1.965,1.965,0,0,1-2.175,2.166h-13.1a1.97,1.97,0,0,1-2.18-2.2q0-8.214,0-16.429a1.963,1.963,0,0,1,2.174-2.167c.641,0,1.284.01,1.924-.008a.681.681,0,0,0,.415-.171,3.534,3.534,0,0,1,2.543-1.029c1.123,0,2.246,0,3.368,0a3.536,3.536,0,0,1,2.487,1,.842.842,0,0,0,.506.2c.664.023,1.329,0,1.993.011a1.936,1.936,0,0,1,2.04,2.058Q343.6,744.6,343.591,748.772Zm-13.832-9.125H328.32c-.678,0-.883.2-.883.878q0,8.23,0,16.46c0,.679.194.87.883.87h13.059c.735,0,.916-.179.916-.905V740.558c0-.092,0-.183,0-.275a.6.6,0,0,0-.541-.613c-.589-.03-1.18-.009-1.776-.009.038.291.088.549.1.809.032.556-.213.812-.764.814-.882,0-1.764,0-2.646,0q-3.11,0-6.22,0c-.594,0-.835-.255-.8-.851C329.669,740.186,329.719,739.939,329.759,739.646Zm8.9.328a2.1,2.1,0,0,0-1.984-1.518c-1.2-.014-2.4-.016-3.6,0a2.1,2.1,0,0,0-1.887,1.166,3.133,3.133,0,0,0-.145.352Z"
        transform="translate(-326.14 -737.153)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M350.722,768.673l1.486-1.474a1.557,1.557,0,0,1-.227-.071.611.611,0,0,1-.39-.66.564.564,0,0,1,.525-.551c.616-.028,1.236-.032,1.852,0a.572.572,0,0,1,.535.614c.019.549.019,1.1,0,1.648a.635.635,0,0,1-.569.632c-.361.042-.6-.163-.758-.666l-1.755,1.749c-.528.527-.785.525-1.318-.008-.574-.573-1.149-1.145-1.745-1.739l-1.516,1.512c-.105.105-.207.214-.317.315a.649.649,0,0,1-.948.02.634.634,0,0,1,.032-.922c.251-.266.515-.521.774-.78.477-.478.952-.958,1.432-1.434a.672.672,0,0,1,1.1.008C349.524,767.472,350.129,768.08,350.722,768.673Z"
        transform="translate(-341.269 -759.735)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M365.058,800.709c-.814,0-1.627,0-2.44,0-.471,0-.775-.251-.785-.634s.3-.661.793-.661q2.457,0,4.915,0c.472,0,.776.25.786.634s-.306.66-.793.662C366.707,800.711,365.882,800.709,365.058,800.709Z"
        transform="translate(-354.182 -786.069)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M365.106,816.7c.813,0,1.627,0,2.44,0,.47,0,.774.254.777.64a.68.68,0,0,1-.768.653q-2.475,0-4.949,0c-.467,0-.773-.261-.777-.645s.3-.647.768-.648C363.433,816.7,364.269,816.7,365.106,816.7Z"
        transform="translate(-354.18 -799.655)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M342.776,797.309c.3-.315.579-.616.87-.9a.65.65,0,0,1,.97-.048.642.642,0,0,1-.049.947q-.644.664-1.307,1.31a.648.648,0,0,1-1.021-.005c-.2-.19-.392-.383-.581-.582a.664.664,0,0,1-.056-.949.647.647,0,0,1,.971.04C342.623,797.164,342.672,797.211,342.776,797.309Z"
        transform="translate(-338.151 -783.516)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
      <path
        d="M342.776,814.587c.3-.314.579-.616.87-.9a.652.652,0,0,1,.971-.048.642.642,0,0,1-.05.947q-.656.676-1.332,1.333a.634.634,0,0,1-.97-.006c-.207-.2-.408-.4-.606-.606a.663.663,0,0,1-.056-.949.646.646,0,0,1,.971.04C342.624,814.443,342.673,814.49,342.776,814.587Z"
        transform="translate(-338.152 -797.092)"
        fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
      />
    </svg>
  );
}
export function IconDriver({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <g transform="translate(15.969 -67.805)">
        <path
          d="M-1.081,86.977h-.551c-2.225,0-4.452.006-6.677-.006-.271,0-.372.074-.448.343a3.564,3.564,0,0,1-3.9,2.59,3.629,3.629,0,0,1-3.289-3.391,11.754,11.754,0,0,1,.142-2.888A4.953,4.953,0,0,1-12,79.747a.566.566,0,0,0,.36-.271c.434-1.371.845-2.75,1.26-4.127a.4.4,0,0,0,0-.115c-.012-.009-.021-.02-.031-.022-1.08-.127-1.141-.2-1.141-1.323,0-.733,0-1.466,0-2.2,0-.645.267-.908.905-.911.406,0,.812,0,1.217,0a2.2,2.2,0,0,1,2.3,2.185c.015.233,0,.466,0,.75.621,0,1.206,0,1.791,0a3.535,3.535,0,0,1,.509.017.731.731,0,0,1,.647.761.719.719,0,0,1-.717.693c-.467.017-.936,0-1.451,0a2.429,2.429,0,0,0,.112.242,3.735,3.735,0,0,1,.581,2.045q-.008,3.751,0,7.5v.487c.131.013.23.031.33.032.942,0,1.885-.006,2.828.006a.545.545,0,0,0,.514-.271,3.422,3.422,0,0,0-.258-4.185,1.266,1.266,0,0,1-.368-.99,6.08,6.08,0,0,0,0-.785A2.28,2.28,0,0,1-1.13,76.786c0-2.236-.006-4.43,0-6.623A2.184,2.184,0,0,1,1.137,67.83q2.886-.048,5.773,0a2.2,2.2,0,0,1,2.265,2.38q.007,2.729,0,5.459a2.226,2.226,0,0,1-2.1,2.461c-.061.01-.122.03-.208.051A2.315,2.315,0,0,1,6.5,80.229,4.476,4.476,0,0,1,8.2,82a12.977,12.977,0,0,1,.923,2.4,2.1,2.1,0,0,1-2.007,2.543,1.122,1.122,0,0,0-1.269.854,3.527,3.527,0,0,1-3.46,2.122,3.7,3.7,0,0,1-3.346-2.55C-1,87.251-1.035,87.127-1.081,86.977ZM.34,72.276c0,1.239-.009,2.43,0,3.62.006.52.308.771.88.772q2.787,0,5.574,0c.639,0,.893-.264.894-.916,0-1.034,0-2.068,0-3.1v-.374ZM-.395,85.462a.406.406,0,0,0,.094.029c2.42,0,4.839.009,7.259,0a.7.7,0,0,0,.693-.975,9.616,9.616,0,0,0-.54-1.468,3.233,3.233,0,0,0-3.09-1.964q-2.079,0-4.158,0c-.083,0-.168.011-.258.017C.238,83.227.238,83.575-.395,85.462Zm-14.09.764a2.2,2.2,0,0,0,2.169,2.225,2.124,2.124,0,0,0,2.237-2.129,2.208,2.208,0,0,0-2.158-2.277A2.193,2.193,0,0,0-14.484,86.226Zm7.329-.728a3.8,3.8,0,0,0-2.822-4.315,3.556,3.556,0,0,0-3.938,1.7,9.559,9.559,0,0,1,1.3-.3,3.674,3.674,0,0,1,3.861,2.576c.042.129.182.309.288.319C-8.039,85.519-7.608,85.5-7.156,85.5Zm-.011-4.375c0-1.41.05-2.755-.018-4.094a1.933,1.933,0,0,0-1.643-1.713l-1.313,4.338A5.326,5.326,0,0,1-7.167,81.122ZM.358,70.753H7.694c0-.244.006-.464,0-.684A.717.717,0,0,0,6.93,69.3q-2.922-.014-5.843,0a.672.672,0,0,0-.721.592A5.749,5.749,0,0,0,.358,70.753Zm-1.466,8.852H3.071c.575,0,1.152.01,1.726-.009a.7.7,0,0,0,.688-.713.716.716,0,0,0-.674-.728c-.116-.011-.235-.007-.353-.007H.063c-1.065,0-1.219.16-1.19,1.238C-1.126,79.437-1.118,79.489-1.107,79.605ZM.528,86.991A2.111,2.111,0,0,0,2.619,88.45a2.043,2.043,0,0,0,1.927-1.459ZM-8.629,73.7c.137-1.251-.271-1.638-1.414-1.387V73.7Z"
          transform="translate(0)"
        />
        <path
          d="M8.1,86.568c.261,0,.523-.013.783,0a.734.734,0,0,1,.7.713.7.7,0,0,1-.631.728,13.006,13.006,0,0,1-1.68,0,.709.709,0,0,1-.64-.76.738.738,0,0,1,.726-.685c.247-.013.5,0,.743,0Z"
          transform="translate(-4.82 -4.002)"
        />
        <path
          d="M-10.756,91.089a.727.727,0,0,1-.754.684.727.727,0,0,1-.7-.778.737.737,0,0,1,.755-.689A.737.737,0,0,1-10.756,91.089Z"
          transform="translate(-0.802 -4.8)"
        />
      </g>
    </svg>
  );
}

export function IconEmployee({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      {hasGradient && <PrimaryLinearGradient />}
      <g transform="translate(-722.034 -441)">
        <path
          d="M727.19,454.547c-1.917-.757-2.8-2.035-2.541-3.735a3.216,3.216,0,0,1,6.28-.322,3.119,3.119,0,0,1-.4,2.565,3.517,3.517,0,0,1-2.1,1.492c.625,0,1.249,0,1.873,0a3.175,3.175,0,0,1,3.177,2.333c.064.2.162.23.341.232,1.058.012,1.234.262.9,1.272-.163.5-.319,1-.494,1.5a.345.345,0,0,0,.091.419,1.824,1.824,0,0,1,.461,1.989,1.884,1.884,0,0,1-1.556,1.286.457.457,0,0,0-.292.254c-.218.589-.406,1.189-.608,1.783a.671.671,0,0,1-.758.55q-3.756,0-7.511,0c-.5,0-.729-.241-.731-.743,0-.731.009-1.463-.01-2.194a.676.676,0,0,0-.192-.429,3.256,3.256,0,0,1-1.091-2.463c0-.857-.005-1.715,0-2.572a3.2,3.2,0,0,1,3.2-3.212C725.888,454.541,726.539,454.547,727.19,454.547Zm-1.3,5.176c.571,0,1.1-.009,1.62,0a.311.311,0,0,0,.362-.259c.186-.6.39-1.194.591-1.789a.685.685,0,0,1,.78-.568c.64,0,1.28,0,1.921,0h1.022a1.837,1.837,0,0,0-1.771-1.28c-1.726-.018-3.453-.025-5.178,0a1.89,1.89,0,0,0-1.9,1.967c-.006.869-.009,1.738,0,2.606a1.84,1.84,0,0,0,1.571,1.845,15.322,15.322,0,0,0,1.881.05.23.23,0,0,0,.176-.119c.134-.373.252-.752.387-1.164-.686,0-1.324,0-1.964,0-.537,0-.771-.234-.774-.776q-.008-1.183,0-2.366c0-.469.266-.768.652-.762s.626.3.628.78C725.892,458.485,725.89,459.078,725.89,459.723Zm7.474-1.318h-.371c-1.017,0-2.034.013-3.05-.008-.3-.007-.407.1-.495.368-.62,1.911-1.257,3.816-1.888,5.723-.038.115-.073.23-.12.38,1.235,0,2.422,0,3.61-.007a.292.292,0,0,0,.218-.151c.135-.359.247-.728.372-1.106a.749.749,0,0,1-.609-.85c.012-.754,0-1.508,0-2.262a.678.678,0,0,1,.757-.767c.375-.005.752,0,1.141,0Zm-5.549-9a1.931,1.931,0,0,0-1.923,1.914,1.929,1.929,0,1,0,3.857.016A1.914,1.914,0,0,0,727.816,449.4Zm-3.188,15.463c.447,0,.877,0,1.307-.005a.231.231,0,0,0,.173-.117c.134-.367.251-.74.39-1.159h-1.871Zm7.719-3.848v1.288c.415-.028.847.125,1.146-.287a.575.575,0,0,0,.031-.675C733.244,460.884,732.787,461.043,732.347,461.02Z"
          transform="translate(0 -3.204)"
          fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
        />
        <path
          d="M743.372,450.085a9.688,9.688,0,0,1-1.079-.087,1.866,1.866,0,0,1-1.527-1.821q-.024-2.641,0-5.282a1.9,1.9,0,0,1,1.916-1.888q3.91-.014,7.82,0a1.9,1.9,0,0,1,1.918,1.922q.017,2.589,0,5.179a1.916,1.916,0,0,1-1.935,1.944c-1.1.014-2.195.01-3.292,0a.71.71,0,0,0-.57.231c-.645.664-1.31,1.309-1.959,1.97-.253.258-.514.477-.9.313s-.4-.511-.4-.868C743.379,451.162,743.372,450.628,743.372,450.085Zm1.294.342c.5-.5.928-.918,1.345-1.353a.974.974,0,0,1,.761-.316c1.211.009,2.422.006,3.632,0a.635.635,0,0,0,.724-.712q.006-2.519,0-5.038a.631.631,0,0,0-.722-.711q-3.822,0-7.642,0a.623.623,0,0,0-.708.689q-.007,2.536,0,5.072a.631.631,0,0,0,.7.7c.4.006.8,0,1.2,0a.657.657,0,0,1,.707.707C744.672,449.755,744.666,450.039,744.666,450.426Z"
          transform="translate(-8.433)"
          fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
        />
        <path
          d="M748.854,448.647c.522-.525.97-.979,1.422-1.429a.653.653,0,1,1,.909.91q-.879.888-1.767,1.766a.659.659,0,0,1-1.046.013c-.295-.286-.587-.574-.87-.872a.638.638,0,0,1-.024-.945.646.646,0,0,1,.921.03C748.555,448.27,748.683,448.447,748.854,448.647Z"
          transform="translate(-11.373 -2.679)"
          fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
        />
      </g>
    </svg>
  );
}

export function IconSettings({ hasGradient }: { hasGradient: boolean } = { hasGradient: true }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={`${hasGradient ? "url(#gradient)" : "currentColor"}`}
    >
      {hasGradient && <PrimaryLinearGradient />}
      <g transform="translate(-1309.761 -591.77)">
        <path d="M1311.912,608.628a2.033,2.033,0,0,1,.709-1.542.345.345,0,0,0,.091-.5,4.037,4.037,0,0,1-.329-.79c-.074-.257-.207-.321-.465-.322a1.941,1.941,0,0,1-2.087-1.644,8.067,8.067,0,0,1,0-2.118,1.922,1.922,0,0,1,2.016-1.645c.3,0,.476-.057.561-.385s.376-.621.35-.911c-.025-.274-.357-.513-.53-.783a1.976,1.976,0,0,1,.209-2.415c.331-.364.683-.708,1.039-1.048a1.988,1.988,0,0,1,2.887.018c.227.225.4.307.7.125a2.555,2.555,0,0,1,.7-.284c.25-.066.3-.2.305-.441a1.95,1.95,0,0,1,1.659-2.109,8.1,8.1,0,0,1,2.118.006,1.905,1.905,0,0,1,1.626,1.992c0,.351.1.514.437.594a2.493,2.493,0,0,1,.661.279.361.361,0,0,0,.527-.087,1.979,1.979,0,0,1,1.987-.641,4.446,4.446,0,0,1,2.515,2.661,1.949,1.949,0,0,1-.657,1.792c-.188.175-.262.332-.094.549a.148.148,0,0,1,.015.031c.126.318.173.73.4.928.206.178.618.1.932.174a2.012,2.012,0,0,1,1.559,1.9c.013.458.007.915,0,1.373a1.988,1.988,0,0,1-2.033,2.083c-.365,0-.49.132-.625.449-.248.58-.417,1.018.148,1.6a1.822,1.822,0,0,1-.148,2.449c-.33.365-.683.709-1.038,1.049a1.99,1.99,0,0,1-2.887-.019c-.228-.227-.4-.3-.7-.124a3.421,3.421,0,0,1-.759.311.29.29,0,0,0-.238.347,2.065,2.065,0,0,1-2.279,2.231c-.353-.026-.709,0-1.064,0a1.989,1.989,0,0,1-2.062-2.018c0-.378-.153-.5-.465-.65a1.2,1.2,0,0,0-1.6.169,1.787,1.787,0,0,1-2.315-.066,9.573,9.573,0,0,1-1.347-1.365,5.143,5.143,0,0,1-.519-1.162Zm8.841,3.836c.217,0,.434,0,.652,0a.73.73,0,0,0,.785-.764c.01-.285,0-.572,0-.858a.678.678,0,0,1,.5-.69q.972-.378,1.926-.8a.684.684,0,0,1,.844.135c.2.2.4.409.609.6a.72.72,0,0,0,1.071.01c.324-.306.639-.622.946-.946a.719.719,0,0,0,0-1.071c-.2-.217-.421-.42-.628-.634a.674.674,0,0,1-.118-.818c.285-.646.551-1.3.813-1.957a.653.653,0,0,1,.639-.474c.309,0,.618.008.927-.006a.718.718,0,0,0,.733-.744c.009-.446.008-.893,0-1.339a.722.722,0,0,0-.746-.766c-.3-.012-.594,0-.892,0a.667.667,0,0,1-.666-.487q-.388-.985-.813-1.957a.671.671,0,0,1,.132-.815c.2-.2.409-.4.6-.608a.725.725,0,0,0,.009-1.1q-.45-.472-.922-.922a.724.724,0,0,0-1.1,0c-.216.2-.417.424-.634.628a.663.663,0,0,1-.79.114q-.971-.423-1.957-.813a.667.667,0,0,1-.49-.663c0-.3.008-.6,0-.892a.721.721,0,0,0-.762-.751c-.435-.008-.87-.006-1.3,0a.727.727,0,0,0-.784.763c-.01.285,0,.572,0,.858a.68.68,0,0,1-.5.691q-.972.378-1.926.8a.684.684,0,0,1-.844-.137c-.2-.2-.4-.409-.609-.6a.718.718,0,0,0-1.071-.009c-.324.306-.639.623-.946.947a.715.715,0,0,0,0,1.07c.2.217.422.42.628.634a.676.676,0,0,1,.118.818c-.284.647-.552,1.3-.812,1.957a.654.654,0,0,1-.639.475c-.3,0-.6-.006-.892,0a.726.726,0,0,0-.769.779c-.006.423-.005.846,0,1.27a.737.737,0,0,0,.815.8c.274.005.549,0,.824,0a.667.667,0,0,1,.667.486q.388.986.813,1.957a.674.674,0,0,1-.13.816c-.2.2-.408.4-.6.609a.722.722,0,0,0-.011,1.1q.45.472.922.923a.725.725,0,0,0,1.1,0c.216-.2.417-.424.634-.628a.664.664,0,0,1,.79-.115q.971.425,1.957.813a.668.668,0,0,1,.492.663c0,.3-.007.6,0,.892a.725.725,0,0,0,.761.752C1320.318,612.469,1320.535,612.464,1320.753,612.464Z" />
        <path
          d="M1327.864,614.693a4.783,4.783,0,1,1,4.823-4.743A4.8,4.8,0,0,1,1327.864,614.693Zm.054-8.276a3.493,3.493,0,1,0,3.479,3.508A3.5,3.5,0,0,0,1327.918,606.417Z"
          transform="translate(-7.139 -7.138)"
        />
      </g>
    </svg>
  );
}
