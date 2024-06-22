import React, { forwardRef } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

type SwitchToggleProps = {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    size?: number;
};

const SwitchToggle = forwardRef<HTMLInputElement, SwitchToggleProps>(
    ({ checked, onChange, label, size = 20 }, ref) => {
        const switchSize = size * 2;
        const iconSize = size;

        return (
            <div className="cursor-pointer flex items-center gap-2 text-sm">
                <label className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 relative flex justify-between items-center group p-2 gap-2">
                    <input
                        type="checkbox"
                        className="cursor-pointer absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        ref={ref}
                        checked={checked}
                        onChange={onChange}
                    />
                    <span
                        className={`cursor-pointer flex items-center flex-shrink-0 py-1 rounded-full duration-300 ease-in-out ${
                            checked ? 'bg-oceanBlue-500' : 'bg-gothamBlack-200'
                        }`}
                        style={{ width: switchSize, height: size + 4 }}
                    >
                        <div
                            className={`rounded-full text-white shadow-sm duration-300 ${
                                checked ? 'translate-x-full' : ''
                            }`}
                            style={{
                                width: iconSize,
                                height: iconSize,
                                transform: checked ? 'translateX(100%)' : '',
                            }}
                        >
                            {checked ? (
                                <FiCheck
                                    size={iconSize}
                                    className="bg-oceanBlue-600 rounded-full"
                                />
                            ) : (
                                <FiX size={iconSize} className="bg-gothamBlack-300 rounded-full" />
                            )}
                        </div>
                    </span>
                    <span className="cursor-pointer duration-200 tracking-tighter">{label}</span>
                </label>
            </div>
        );
    }
);

export default SwitchToggle;
