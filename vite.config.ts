import { UserConfig } from "vite";
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import cssnano from 'cssnano';
import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';

export default (): UserConfig => {
    return {
        base: "./",
        plugins: [
            ViteMinifyPlugin(),
        ],
        css: {
            postcss: {
                plugins: [
                    postcssJitProps(OpenProps),
                    cssnano(),
                ],
            }
        }
    };
};