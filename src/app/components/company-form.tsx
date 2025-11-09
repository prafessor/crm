'use client'

import React from "react";
import { Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CompanyStatus, createCompany, getCategories, getCountries } from "@/lib/api";
import Button from "@/app/components/button";
import InputField from "@/app/components/input-field";
import LogoUploader from "@/app/components/logo-uploader";
import StatusLabel from "@/app/components/status-label";

export type CompanyFieldValues = {
    title: string,
    description: string;
    status: CompanyStatus;
    joinedDate: string;
    categoryId: string;
    countryId: string;
};

const initialValues: CompanyFieldValues = {
    title: '',
    description: '',
    status: CompanyStatus.Active,
    joinedDate: '',
    categoryId: '',
    countryId: '',
};

export interface CompanyFormProps {
    onSubmit?: (values: CompanyFieldValues) => void | Promise<void>;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 10 * 1000,
    });

    const { data: countries } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
        staleTime: 10 * 1000,
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['companies'],
            });
        },
    });

    const handleSubmit = async ( values: CompanyFieldValues) => {
        await mutateAsync({
            ...values,
            categoryTitle: categories?.find(({ id }) => id === values.categoryId)?.title ?? '',
            countryTitle: countries?.find(({ id }) => id === values.countryId)?.title ?? '',
        });

        if (onSubmit) {
            onSubmit(values);
        }
    };


    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-10">
                <p className="mb-0.5 text-xl">Add new company</p>
                <div className="flex gap-6">
                    <div className="flex flex-col flex-1 gap-5">
                        <LogoUploader label="Logo" placeholder="Upload photo" />
                        <InputField label="Status" placeholder="Status" name="status" as="select" required>
                            {(Object.values(CompanyStatus) as CompanyStatus[]).map(
                                (status) => (
                                    <option key={status} value={status}>
                                        <StatusLabel status={status} styled={false} />
                                    </option>
                                )
                            )}
                        </InputField>
                        <InputField label="Country" placeholder="Country" name="countryId" as="select" required>
                            {countries?.map(
                                (country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.title}
                                    </option>
                                )
                            )}
                        </InputField>
                    </div>
                    <div className="flex flex-col flex-1 gap-5">
                        <InputField label="Name" placeholder="Name" name="title" required />
                        <InputField label="Category" placeholder="Category" name="categoryId" as="select" required>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </InputField>
                        <InputField label="Joined date" type="date" name="joinedDate" required />
                        <InputField label="Description" placeholder="Description" name="description" required />
                    </div>
                </div>
                <Button type="submit" disabled={isPending}>Add company</Button>
            </Form>
        </Formik>
    )
}