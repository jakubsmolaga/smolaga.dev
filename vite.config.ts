import { UserConfig } from "vite";
// import { ViteMinifyPlugin } from 'vite-plugin-minify';
import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';

export default (): UserConfig => {
    return {
        base: "./",
        plugins: [],
        css: {
            postcss: {
                plugins: [
                    postcssJitProps(OpenProps),
                ],
            }
        }
    };
};