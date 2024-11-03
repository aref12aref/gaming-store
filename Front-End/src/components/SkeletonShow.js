import Skeleton from "react-loading-skeleton";

export default function SkeletonShow(props) {
    const skeletonLength = Array.from({ length: props.length }).map(
        (_, key) => {
            return (
                <div
                    key={key}
                    style={{
                        margin: "10px",
                        display: "flex",
                    }}
                >
                    <Skeleton
                        height={props.height}
                        width={props.width}
                    />
                </div>
            );
        }
    );
    return skeletonLength;
}
