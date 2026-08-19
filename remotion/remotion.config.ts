import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setBrowserExecutable("/home/neil/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome");
Config.setPublicDir("./remotion/public");
