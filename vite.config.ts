import { UserConfig } from "vite";
import { ViteMinifyPlugin } from 'vite-plugin-minify';
// import viteCompression from 'vite-plugin-compression';
import htmlPurge from 'vite-plugin-purgecss';

export default (): UserConfig => {
    return {
        base: "./",
        plugins: [
            htmlPurge({}) as any,
            // viteCompression({
            //     algorithm: 'brotliCompress',
            //     filter: /\.(js|mjs|json|css|html|glb)$/i,
            //     deleteOriginFile: true,
            // }),
            ViteMinifyPlugin({})
        ],
    };
};