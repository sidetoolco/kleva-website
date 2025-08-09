// Define the type for the detail data
interface EventDetail {
	[key: string]: any;
}

// Define the function with proper types
const useDispatchEvent = (_name: string, _data: EventDetail = {}): void => {
	window.dispatchEvent(new CustomEvent(_name, { detail: _data }));
	//console.log('useDispatchEvent', _name, _data);
};

export default useDispatchEvent;
