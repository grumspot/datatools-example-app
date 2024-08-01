import { extension } from "@shopify/ui-extensions-react/checkout";

const ADDRESSES = [
  {
    id: "1",
    address1: "644 Smith St",
    address2: "Apt 124",
    city: "Perth",
    zip: "4000",
    provinceCode: "SA",
    countryCode: "AU",
  },
  {
    id: "2",
    address1: "808 Brown St",
    address2: "Apt 530",
    city: "Adelaide",
    zip: "3000",
    provinceCode: "VIC",
    countryCode: "AU",
  },
  {
    id: "3",
    address1: "620 Smith St",
    address2: "Apt 396",
    city: "Perth",
    zip: "4000",
    provinceCode: "WA",
    countryCode: "AU",
  },
  {
    id: "4",
    address1: "153 Johnson St",
    address2: "Apt 928",
    city: "Sydney",
    zip: "5000",
    provinceCode: "VIC",
    countryCode: "AU",
  },
  {
    id: "5",
    address1: "556 Jones St",
    address2: "Apt 695",
    city: "Melbourne",
    zip: "5000",
    provinceCode: "QLD",
    countryCode: "AU",
  },
  {
    id: "6",
    address1: "503 Johnson St",
    address2: "Apt 443",
    city: "Brisbane",
    zip: "2000",
    provinceCode: "WA",
    countryCode: "AU",
  },
  {
    id: "7",
    address1: "770 Smith St",
    address2: "Apt 301",
    city: "Adelaide",
    zip: "3000",
    provinceCode: "SA",
    countryCode: "AU",
  },
  {
    id: "8",
    address1: "199 Brown St",
    address2: "Apt 997",
    city: "Melbourne",
    zip: "3000",
    provinceCode: "WA",
    countryCode: "AU",
  },
  {
    id: "9",
    address1: "639 Johnson St",
    address2: "Apt 779",
    city: "Sydney",
    zip: "5000",
    provinceCode: "QLD",
    countryCode: "AU",
  },
  {
    id: "10",
    address1: "22 Williams St",
    address2: "Apt 335",
    city: "Perth",
    zip: "4072",
    provinceCode: "QLD",
    countryCode: "AU",
  },
  {
    id: "11",
    address1: "50 King Will St",
    address2: "Fl. 6, Apt 100",
    city: "Brisbane",
    zip: "4007",
    provinceCode: "QLD",
    countryCode: "AU",
  },
];

type Address = (typeof ADDRESSES)[number];

const fetchAddresses = ({
  field,
  value,
}: {
  field: "address1" | "zip";
  value: string;
}) =>
  new Promise<Address[]>((resolve) => {
    setTimeout(() => {
      resolve(ADDRESSES.filter((address) => address[field].includes(value)));
    }, 500);
  });

export default extension(
  "purchase.address-autocomplete.suggest",
  async ({ signal, target }) => {
    const addresses = await fetchAddresses(target);

    return {
      suggestions: addresses.map((suggestion) => {
        const label = `${suggestion.address1} - ${suggestion.zip}`;

        const matchedSubstrings =
          [...label.matchAll(target.value)]?.map((match) => ({
            offset: match.index,
            length: target.value.length,
          })) || [];

        return {
          id: suggestion.id,
          label,
          matchedSubstrings,
          formattedAddress: {
            address1: suggestion.address1,
            address2: suggestion.address2,
            city: suggestion.city,
            zip: suggestion.zip,
            provinceCode: suggestion.provinceCode,
            countryCode: suggestion.countryCode,
          },
        };
      }),
    };
  },
);
