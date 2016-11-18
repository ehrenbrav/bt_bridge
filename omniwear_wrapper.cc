#include <node.h>
#include "omniwear.h"

namespace omni_wrapper {

        using v8::Exception;
        using v8::FunctionCallbackInfo;
        using v8::Isolate;
        using v8::Local;
        using v8::Object;
        using v8::String;
        using v8::Value;
        using v8::Persistent;

        Omniwear::DeviceP handle = 0x0;

        // Open the haptic device.
        void open(const FunctionCallbackInfo<Value>& args) {

                Isolate* isolate = args.GetIsolate();

                // Check args.
                if (args.Length() != 0) {
                        isolate->ThrowException(Exception::TypeError(
                            String::NewFromUtf8(isolate, "open takes no arguments.\n")));
                        return;
                }

                // Open the device if not already open.
                if (handle.get() == 0x0) {
                        printf("Opening haptic device.\n");
                        handle = Omniwear::open();

                        // Handle errors.
                        if (handle.get() == 0x0) {
                                printf("Could not open haptic device.\n");
                        }
                }
        }

        // Reset all motors.
        void reset_motors(const FunctionCallbackInfo<Value>& args) {
                
                Isolate* isolate = args.GetIsolate();

                // Check args.
                if (args.Length() != 0) {
                        isolate->ThrowException(Exception::TypeError(
                            String::NewFromUtf8(isolate, "reset_motors takes no arguments.\n")));
                        return;
                }

                // Reset the device if present.
                if (handle.get() != 0x0) {
                        printf("Resetting haptic device.\n");
                        bool ret = Omniwear::reset_motors(handle.get());

                        // Error handle.
                        if (ret) {
                                printf("Error resetting haptic device.\n");
                                return;
                        }
                }
        }

        void configure_motor(const FunctionCallbackInfo<Value>& args) {

                Isolate* isolate = args.GetIsolate();

                // Check args.
                if (args.Length() != 2) {
                        isolate->ThrowException(Exception::TypeError(
                            String::NewFromUtf8(isolate, "configure_motor takes 2 arguments.\n")));
                        return;
                }

                // Run the motor if device is present; otherwise try to open.
                if (handle.get() != 0x0) {
                        bool ret = Omniwear::configure_motor(handle.get(), args[0]->NumberValue(), args[1]->NumberValue());
                        // Handle write failures.
                        if (ret) {handle = 0x0;}
                }
                
                // Reconnect if necessary...
                if (handle.get() == 0x0) {handle = Omniwear::open();}
        }

        void init(Local<Object> exports) {

                NODE_SET_METHOD(exports, "open", open);
                NODE_SET_METHOD(exports, "reset_motors", reset_motors);
                NODE_SET_METHOD(exports, "configure_motor", configure_motor);
        }

        NODE_MODULE(omniwear_addon, init)
        
} // namespace



