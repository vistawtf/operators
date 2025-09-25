import * as React from "react";

type VistaIconProps = React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
};

const VistaIcon: React.FC<VistaIconProps> = ({ 
  width = 18, 
  height = 17, 
  ...props 
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 17"
    fill="none"
    className="vista-icon-hover"
    {...props}
  >
    <g className="vista-star-container">
      <style>{`
        .vista-icon-hover {
          cursor: pointer;
        }

        .vista-star-overlay {
          fill: white;
          opacity: 0;
          mix-blend-mode: overlay;
        }

        /* Animación simple y notoria */
        @keyframes vistaFlash1 {
          0% { opacity: 1; }
          30% { opacity: 1; }
          35% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes vistaFlash2 {
          0% { opacity: 0; }
          35% { opacity: 0; }
          40% { opacity: 0.8; }
          70% { opacity: 0.8; }
          75% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes vistaFlash3 {
          0% { opacity: 0; }
          75% { opacity: 0; }
          80% { opacity: 0.6; }
          95% { opacity: 0.6; }
          100% { opacity: 0; }
        }

        /* Hover en el SVG completo */
        .vista-icon-hover:hover .vista-star-overlay-1 {
          animation: vistaFlash1 2s linear infinite;
        }

        .vista-icon-hover:hover .vista-star-overlay-2 {
          animation: vistaFlash2 2s linear infinite;
        }

        .vista-icon-hover:hover .vista-star-overlay-3 {
          animation: vistaFlash3 2s linear infinite;
        }
      `}</style>
      
      {/* Cross/Plus Symbol */}
      <g className="vista-star vista-star-1">
        <path
          d="M2.01694 16.366V14.317H0.0232892V13.3571H2.01694V11.308H2.97685V13.3571H4.97051V14.317H2.97685V16.366H2.01694Z"
          fill="#FF5233"
        />
        <path
          className="vista-star-overlay vista-star-overlay-1"
          d="M2.01694 16.366V14.317H0.0232892V13.3571H2.01694V11.308H2.97685V13.3571H4.97051V14.317H2.97685V16.366H2.01694Z"
        />
      </g>
      
      {/* Circle Symbol */}
      <g className="vista-star vista-star-2">
        <path
          d="M6.85138 4.36717C6.35912 4.36717 5.9407 4.20103 5.59612 3.86876C5.26384 3.53648 5.09771 3.11806 5.09771 2.6135C5.09771 2.12123 5.26384 1.70897 5.59612 1.37669C5.9407 1.03211 6.35912 0.859817 6.85138 0.859817C7.35595 0.859817 7.77437 1.03211 8.10665 1.37669C8.45123 1.70897 8.62352 2.12123 8.62352 2.6135C8.62352 3.11806 8.45123 3.53648 8.10665 3.86876C7.77437 4.20103 7.35595 4.36717 6.85138 4.36717ZM6.85138 3.37034C7.0729 3.37034 7.25135 3.30266 7.38672 3.16729C7.5344 3.01961 7.60823 2.83501 7.60823 2.6135C7.60823 2.40428 7.5344 2.23199 7.38672 2.09662C7.25135 1.94894 7.0729 1.8751 6.85138 1.8751C6.64217 1.8751 6.46373 1.94894 6.31605 2.09662C6.18068 2.23199 6.11299 2.40428 6.11299 2.6135C6.11299 2.83501 6.18068 3.01961 6.31605 3.16729C6.46373 3.30266 6.64217 3.37034 6.85138 3.37034Z"
          fill="#FF5233"
        />
        <path
          className="vista-star-overlay vista-star-overlay-2"
          d="M6.85138 4.36717C6.35912 4.36717 5.9407 4.20103 5.59612 3.86876C5.26384 3.53648 5.09771 3.11806 5.09771 2.6135C5.09771 2.12123 5.26384 1.70897 5.59612 1.37669C5.9407 1.03211 6.35912 0.859817 6.85138 0.859817C7.35595 0.859817 7.77437 1.03211 8.10665 1.37669C8.45123 1.70897 8.62352 2.12123 8.62352 2.6135C8.62352 3.11806 8.45123 3.53648 8.10665 3.86876C7.77437 4.20103 7.35595 4.36717 6.85138 4.36717ZM6.85138 3.37034C7.0729 3.37034 7.25135 3.30266 7.38672 3.16729C7.5344 3.01961 7.60823 2.83501 7.60823 2.6135C7.60823 2.40428 7.5344 2.23199 7.38672 2.09662C7.25135 1.94894 7.0729 1.8751 6.85138 1.8751C6.64217 1.8751 6.46373 1.94894 6.31605 2.09662C6.18068 2.23199 6.11299 2.40428 6.11299 2.6135C6.11299 2.83501 6.18068 3.01961 6.31605 3.16729C6.46373 3.30266 6.64217 3.37034 6.85138 3.37034Z"
        />
      </g>
      
      {/* Complex Geometric Shape */}
      <g className="vista-star vista-star-3">
        <path
          d="M12.6923 8.24372V5.40092H14.003V8.24372H12.6923ZM9.03728 10.5327V9.22209H11.8801V10.5327H9.03728ZM14.8706 10.5327V9.22209H17.7134V10.5327H14.8706ZM12.6923 14.317V11.4742H14.003V14.317H12.6923Z"
          fill="#FF5233"
        />
        <path
          className="vista-star-overlay vista-star-overlay-3"
          d="M12.6923 8.24372V5.40092H14.003V8.24372H12.6923ZM9.03728 10.5327V9.22209H11.8801V10.5327H9.03728ZM14.8706 10.5327V9.22209H17.7134V10.5327H14.8706ZM12.6923 14.317V11.4742H14.003V14.317H12.6923Z"
        />
      </g>
    </g>
  </svg>
);

export default VistaIcon;
