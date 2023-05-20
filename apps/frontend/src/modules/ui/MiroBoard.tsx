import { FC, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  createUseGesture,
  dragAction,
  pinchAction,
  useDrag,
} from "@use-gesture/react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { BsTextareaResize } from "react-icons/bs";

const useGesture = createUseGesture([dragAction, pinchAction]);

const MiroBoard: FC = () => {
  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);

  const [style, api] = useSpring(() => ({
    x: 128,
    y: 128,
  }));
  const [scale, setScale] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        setScale(s);
        return memo;
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  );

  const bindSize = useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      if (scale + my / 10000 < 0.5 || scale + my / 10000 > 2) return;
      setScale((s) => s + my / 10000);
    }
  });

  return (
    <animated.div
      className={` fixed left-0 top-0 h-max w-max cursor-pointer`}
      style={{
        x: style.x,
        y: style.y,
      }}
    >
      <animated.div
        ref={ref}
        className={`h-max w-max touch-none rounded bg-white p-12`}
      >
        <div className=" absolute left-2 top-2">
          <MdOutlineDragIndicator className="h-5 w-5" />
        </div>
        <iframe
          width={768 * scale}
          height={432 * scale}
          src="https://miro.com/app/live-embed/uXjVMGuVuHo=?autoplay=true"
          allowFullScreen
        ></iframe>
      </animated.div>

      <div
        {...bindSize()}
        className=" absolute -bottom-8 -right-8 h-6 w-6 touch-none rounded bg-white shadow"
      >
        <BsTextareaResize className="h-5 w-5" />
      </div>
    </animated.div>
  );
};

export default MiroBoard;
