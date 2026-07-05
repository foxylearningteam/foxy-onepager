"use client";

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
};

export default function Checkbox({ id, checked, onChange, children }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
      <span className="relative mt-0.5 inline-flex h-6 w-6 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="flex h-6 w-6 items-center justify-center rounded-[7px] border-[2.5px] border-purple bg-white">
          {/* Checkmark (shown when checked) */}
          <svg
            viewBox="9.5 9.5 13 13"
            className={`h-[13px] w-[13px] transition-opacity ${
              checked ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          >
            <path
              className="fill-purple"
              d="M21.8316 13.8317C22.3523 13.311 22.3523 12.4668 21.8316 11.9461C21.3109 11.4254 20.4667 11.4254 19.946 11.9461L14.6666 17.2255L12.4983 15.0572C11.9776 14.5365 11.1333 14.5365 10.6126 15.0572C10.0919 15.5779 10.0919 16.4221 10.6126 16.9428L13.7237 20.0539C14.2444 20.5746 15.0887 20.5746 15.6094 20.0539L21.8316 13.8317Z"
            />
          </svg>
        </span>
      </span>
      <span className="font-nunito text-[13px] font-medium leading-snug text-navy">
        {children}
      </span>
    </label>
  );
}
