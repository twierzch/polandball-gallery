export default function throttleDecorator( ) {
    if( arguments.length === 1) {
        return throttleDecoratorFnWrapper( arguments[0] );
    }

    return throttleDecoratorFnWrapper()( ...arguments );
}

function throttleDecoratorFnWrapper( threshhold ) {
    return function throttleDecoratorFn( target, key, descriptor ) {
        const fn = descriptor.value;

        if (typeof fn !== 'function') {
            throw new Error(
                `@throttle decorator can only be applied to methods not: ${typeof fn}`
            );
        }

        //IE11 hack
        let definingProperty = false;

        return {
            configurable: true,
            get() {
                if( definingProperty
                    || this === target.prototype
                    || this.hasOwnProperty( key )
                ) {
                    return fn;
                }

                const throttleFn = throttle( fn, threshhold, this );
                definingProperty = true;

                Object.defineProperty(this, key, {
                    value: throttleFn,
                    configurable: true,
                    writable: true
                });

                definingProperty = false;
                return throttleFn;
            }
        }
    }
}

export function throttle(fn, threshhold, scope) {
  threshhold = threshhold || 250;
  var last, deferTimer;

  return function () {
    var context = scope || this;

    const now = +new Date();
    const args = arguments;

    if (last && now < last + threshhold) {
      clearTimeout( deferTimer );
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
