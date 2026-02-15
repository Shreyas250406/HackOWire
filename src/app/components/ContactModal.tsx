import { X, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any | null;   // 🔥 now receives ML riskData object
}

export function ContactModal({ isOpen, onClose, customer }: ContactModalProps) {

  if (!customer) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">

              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white bg-purple-500/30 border-2 border-purple-200">
                    {customer.customer_name?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {customer.customer_name}
                    </h2>
                    <p className="text-purple-100 text-sm">
                      {customer.product}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    CONTACT DETAILS
                  </h3>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg mb-3 hover:bg-purple-100 transition-colors">
                    <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Email Address</div>
                      <a href={`mailto:${customer.email}`} className="text-sm text-gray-800 font-medium hover:text-purple-600">
                        {customer.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg mb-3 hover:bg-blue-100 transition-colors">
                    <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Phone Number</div>
                      <a href={`tel:${customer.phone}`} className="text-sm text-gray-800 font-medium hover:text-blue-600">
                        {customer.phone}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Address</div>
                      <p className="text-sm text-gray-800 font-medium">
                        {customer.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="pt-4 border-t border-purple-100">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    ACCOUNT INFORMATION
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Product Type</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {customer.product}
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Geography</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {customer.geography}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-purple-100">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all"
                >
                  Close
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
