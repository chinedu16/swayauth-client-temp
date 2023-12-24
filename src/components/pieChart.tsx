import { useCallback } from "react";
import { SpinnerCircle2 } from "./spinner";

const PieChart = ({ colors, data, loading, height = 200, width = 200 }: { data: { [key: string]: number }, colors: string[], loading?: boolean, height?: number, width?: number }) => {

  const pieRef = useCallback((canvas: HTMLCanvasElement) => {
    if (canvas) {
      let ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
      let lastend = 0;
      let myTotal = 0;
      const labels = Object.keys(data)
      for (let key in data) {
        myTotal += data[key];
      }
      let off = 10
      let w = (canvas.width - off) / 2
      let h = (canvas.height - off) / 2
      let u = 0;
      for (let i in data) {
        ctx.fillStyle = colors[u];
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w, h);
        let len = (data[i] / myTotal) * 2 * Math.PI
        let r = h - off / 2
        ctx.arc(w, h, r, lastend, lastend + len, false);
        ctx.lineTo(w, h);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = "12px Arial";
        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
        let mid = lastend + len / 2
        ctx.fillText(labels[u].toUpperCase(), w + Math.cos(mid) * (r / 2.5), h + Math.sin(mid) * (r / 2));
        lastend += Math.PI * 2 * (data[i] / myTotal);
        u++;
      }
    }
  }, [data])

  return <div className={`flex flex-wrap ${loading ? ' opacity-20' : ''}`}>
    {
      loading ?
        <span style={{ height, aspectRatio: 1 }} className="inline-flex items-center justify-center">
          <SpinnerCircle2 size="xl" />
        </span>
        :
        <canvas ref={pieRef} width={width} height={height} />
    }
    <div className="mt-4 ml-10">
      {
        Object.keys(data).map((item, i) =>
          <div key={i} className="flex mb-1 items-center">
            <span style={{ backgroundColor: colors[i] }} className='inline-block rounded-sm mr-2 w-[1rem] h-[1rem]'></span>
            <span className="capitalize inline-block">{item}: {data[item]}</span>
          </div>
        )
      }
    </div>
  </div>;
};

export default PieChart;
