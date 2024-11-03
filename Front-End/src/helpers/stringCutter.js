export default function stringCutter(value, letters) {
    value = value.slice(0, letters);
    return `${value}...`;
}
