import Handlebars from 'handlebars';

type IconHelperHash = {
  class?: string;
};

type HandlebarsRuntimeOptions = {
  hash?: IconHelperHash;
};

function isHandlebarsOptions(value: unknown): value is HandlebarsRuntimeOptions {
  return Boolean(value && typeof value === 'object' && 'hash' in (value as object));
}

/**
 * Renders an SVG icon from the sprite via <use>.
 *
 * {{icon "arrow-right" class="hero__btn-icon"}}
 */
export function iconHelper(
  nameOrOptions: unknown,
  maybeOptions?: unknown,
): Handlebars.SafeString {
  const name = typeof nameOrOptions === 'string' ? nameOrOptions : '';
  const options = isHandlebarsOptions(maybeOptions)
    ? maybeOptions
    : isHandlebarsOptions(nameOrOptions)
      ? nameOrOptions
      : undefined;

  const extraClass = options?.hash?.class ? ` ${String(options.hash.class)}` : '';

  return new Handlebars.SafeString(
    `<svg class="icon${extraClass}" aria-hidden="true" focusable="false"><use href="#icon-${name}"></use></svg>`,
  );
}
