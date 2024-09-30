import { useEffect, useState, useRef } from 'react';

/**
 * Set some state in React, and also persist that value in localStorage.
 * @param {string} storageKey The key of the value in localStorage.
 * @param {string | null} initialValue The initial value to store in localStorage and React state.
 * @returns {[string | null, React.Dispatch<string | null>]}
 */
export function useStateWithStorage(storageKey, initialValue) {
	const [value, setValue] = useState(
		() => localStorage.getItem(storageKey) ?? initialValue,
	);
	useEffect(() => {
		if (value === null || value === undefined) {
			return localStorage.removeItem(storageKey);
		}
		return localStorage.setItem(storageKey, value);
	}, [storageKey, value]);

	return [value, setValue];
}

export function useVoiceToText() {
	const [text, setText] = useState('');
	const [isListening, setIsListening] = useState(false);
	const recognitionRef = useRef(null);

	useEffect(() => {
		if (
			!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
		) {
			console.error('SpeechRecognition is not supported by this browser.');
			return;
		}

		recognitionRef.current = new (window.SpeechRecognition ||
			window.webkitSpeechRecognition ||
			window.mozSpeechRecognition ||
			window.msSpeechRecognition)();

		recognitionRef.current.lang = 'en-US';
		recognitionRef.current.interimResults = false;
		recognitionRef.current.maxAlternatives = 1;

		recognitionRef.current.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			setText(transcript);
		};
		recognitionRef.current.onend = () => {
			setIsListening(false);
		};

		recognitionRef.current.onerror = (error) => {
			console.error('Speech recognition error:', error);
			setIsListening(false);
		};

		return () => {
			recognitionRef.current.stop();
			recognitionRef.current = null;
		};
	}, []);

	function detectBrowser() {
		let userAgent = navigator.userAgent;
		if (userAgent.indexOf('Edg') > -1) {
			return 'Microsoft Edge';
		} else if (userAgent.indexOf('Chrome') > -1) {
			return 'Chrome';
		} else if (userAgent.indexOf('Firefox') > -1) {
			return 'Firefox';
		} else if (userAgent.indexOf('Safari') > -1) {
			return 'Safari';
		} else if (userAgent.indexOf('Opera') > -1) {
			return 'Opera';
		} else if (
			userAgent.indexOf('Trident') > -1 ||
			userAgent.indexOf('MSIE') > -1
		) {
			return 'Internet Explorer';
		}

		return 'Unknown';
	}

	const startListening = async () => {
		try {
			// Request microphone access
			await navigator.mediaDevices.getUserMedia({ audio: true });
			console.log('Microphone access granted. Starting speech recognition...');

			const browserName = detectBrowser();
			if (browserName === 'Safari') {
				window.alert('Start Voice Input is not working in your browser.');
				return;
			}

			if (!isListening && recognitionRef.current) {
				recognitionRef.current.start();
				setIsListening(true);
			}
		} catch (err) {
			console.error('Error accessing microphone:', err);
			setError('Failed to access microphone. Please enable mic permissions.');
		}
	};

	const stopListening = () => {
		if (isListening && recognitionRef.current) {
			recognitionRef.current.stop();
			setIsListening(false);
		}
	};

	return { text, isListening, startListening, stopListening };
}
