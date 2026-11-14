"use client";

import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

type OptionGroupProps<T extends string> = {
  name: string;
  label: string;
  options: ReadonlyArray<{ id: T; title: string }>;
  value: T;
  onValueChange: (value: T) => void;
};

export function SelectGroup<T extends string>({
  name,
  label,
  options,
  value,
  onValueChange,
}: OptionGroupProps<T>) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel render={<label htmlFor={name} />}>
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <NativeSelect
          id={name}
          className="w-full"
          value={value}
          onChange={(e) => onValueChange(e.target.value as T)}
        >
          {options.map((item) => (
            <NativeSelectOption key={item.id} value={item.id}>
              {item.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function SegmentedGroup<T extends string>({
  name,
  label,
  options,
  value,
  onValueChange,
}: OptionGroupProps<T>) {
  const labelId = `${name}-label`;

  return (
    <SidebarGroup>
      <SidebarGroupLabel id={labelId}>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <RadioGroup
          aria-labelledby={labelId}
          className="grid-cols-3"
          value={value}
          onValueChange={(value) => onValueChange(value as T)}
        >
          {options.map((item) => {
            const itemId = `${name}-${item.id}`;

            return (
              <FieldLabel
                key={item.id}
                htmlFor={itemId}
                className="*:data-[slot=field]:px-2 *:data-[slot=field]:py-1"
              >
                <Field orientation="horizontal">
                  <RadioGroupItem
                    value={item.id}
                    id={itemId}
                    className="sr-only absolute"
                  />
                  <FieldTitle className="justify-center text-xs">
                    {item.title}
                  </FieldTitle>
                </Field>
              </FieldLabel>
            );
          })}
        </RadioGroup>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
