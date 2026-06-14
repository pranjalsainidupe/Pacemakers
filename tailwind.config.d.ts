declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                ink: string;
                panel: string;
                line: string;
                electric: string;
                glow: string;
                ember: string;
            };
            boxShadow: {
                glow: string;
            };
            keyframes: {
                pulsebar: {
                    "0%, 100%": {
                        opacity: string;
                        transform: string;
                    };
                    "50%": {
                        opacity: string;
                        transform: string;
                    };
                };
                drift: {
                    "0%": {
                        transform: string;
                    };
                    "100%": {
                        transform: string;
                    };
                };
            };
            animation: {
                pulsebar: string;
                drift: string;
            };
        };
    };
    plugins: any[];
};
export default _default;
